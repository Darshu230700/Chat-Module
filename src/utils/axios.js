import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------


const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    // Add any additional default headers if needed
  }
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async ([url, config]) => {
  // const [url, config] = Array.isArray(args) ? args : [args];
  try {
    const response = await axiosInstance.post(url, config);
    return response.data;
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/Register/GetAdminDetailsByTokan',
    login: '/api/Register/Login',
    register: '/api/UserMaster/RegistorUserMaster',
    forgotPassword: '/api/Login/ForgotPassword',
    newPassword: '/api/Login/newPassword',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    list: "/api/EmployeeMaster/GetAllEmployeeMaster",
    getbyID: '/api/EmployeeMaster/GetEmployeeMasterByID',
    delete: '/api/EmployeeMaster/DeleteEmployeeMasterByID',
    AddEditUser: '/api/EmployeeMaster/CreateUpdateEmployeeMaster',
  },
  admin: {
    list: "/api/Register/GetListofAdmins",
    getbyID: '/api/Register/GetAdminDetailsByID',
    delete: '/api/Register/DeleteAdminDetailsByID',
    Add: '/api/Register/CreateNewAdmin',
    Edit: '/api/Register/UpdateAdmin',
  },
  chatbot: {
    list: "/api/EmployeeMaster/GetAllEmployeeMaster",
    getbyID: '/api/EmployeeMaster/GetEmployeeMasterByID',
    delete: '/api/EmployeeMaster/DeleteEmployeeMasterByID',
    AddEditUser: '/api/EmployeeMaster/CreateUpdateEmployeeMaster',
  },
};
