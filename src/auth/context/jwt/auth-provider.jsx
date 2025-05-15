import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { Encrypt } from 'src/common/Encrypt/Encrypt';
import { Decrypt } from 'src/common/Decrypt/Decrypt';
import axiosInstance from 'src/utils/axios';
// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
  permission: {}
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {

        setSession(accessToken);

        const URL = endpoints.auth.me;

        const { data } = await axiosInstance.post(URL);

        const user = data?.data ? Decrypt(data?.data) : null;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      EmailID: email,
      Password: password,
    };

    const Params = { payload: Encrypt(data) }

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(endpoints.auth.login, Params, { headers });
    if (response?.data?.status) {
      const user = Decrypt(response.data.data)
      const { Token } = user;
      setSession(Token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...user,
            token: Token,
          },
        },
      });
    }
    return response
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName, phoneNumber) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
      Phone: phoneNumber,
      IsTrial: true
    };
    const Params = { payload: Encrypt(data) }
    const response = await axios.post(endpoints.auth.register, Params);

    // const user = Decrypt(response.data.data)

    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     user: {
    //       ...user,
    //     },
    //   },
    // });
    return response
  }, []);

  // FORGOTPASSWORD
  const forgotPassword = useCallback(async (email) => {
    const data = {
      Email: email,
    };

    const params = { payload: Encrypt(data) };
    const response = await axios.post(endpoints.auth.forgotPassword, params);

    if (response) {
      return response
    }

  }, []);

  // NEWPASSWORD
  const newPassword = useCallback(async (email, code, password) => {
    const data = {
      Email: email,
      OTP: code,
      Password: password,
    };

    const params = { payload: Encrypt(data) };
    const response = await axios.post(endpoints.auth.newPassword, params);

    if (response) {
      return response
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, forgotPassword, newPassword, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
