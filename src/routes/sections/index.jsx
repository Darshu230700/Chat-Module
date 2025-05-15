import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_AFTER_LOGIN, PATH_BEFORE_LOGIN } from 'src/config-global';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const session = sessionStorage.getItem('accessToken');

  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    {
      path: '/',
      element: <Navigate to={session !== null ? PATH_AFTER_LOGIN : PATH_BEFORE_LOGIN} replace />,
    },

    // ----------------------------------------------------------------------

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
