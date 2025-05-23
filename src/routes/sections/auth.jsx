import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtVerifyPage = lazy(() => import('src/pages/auth/jwt/verify'));
const JwtNewPasswordPage = lazy(() => import('src/pages/auth/jwt/newPassword'));
const JwtForgotPasswordPage = lazy(() => import('src/pages/auth/jwt/forgotPassword'));


// ----------------------------------------------------------------------

const authJwt = {
  path: '',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      element: (
        <AuthClassicLayout>
          <Outlet />
        </AuthClassicLayout>
      ),
      children: [
        { path: 'verify', element: <JwtVerifyPage /> },
        { path: 'new-password', element: <JwtNewPasswordPage /> },
        { path: 'forgot-password', element: <JwtForgotPasswordPage /> },
      ],
    },
  ],
};


export const authRoutes = [
  {
    path: '/',
    children: [authJwt],
  },
];
