import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));

//ADMIN

const AdminListPage = lazy(() => import('src/pages/admin/list'));
const AdminCreatePage = lazy(() => import('src/pages/admin/new'));
const AdminEditPage = lazy(() => import('src/pages/admin/edit'));

const ChatbotListPage = lazy(() => import('src/pages/chatbot/list'));
const ChatbotCreatePage = lazy(() => import('src/pages/chatbot/new'));
const ChatbotEditPage = lazy(() => import('src/pages/chatbot/edit'));


// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: 'dashboard',
        children: [
          { element: <IndexPage />, index: true },
        ],
      },
      // { element: <IndexPage />, index: true },
      // { path: 'ecommerce', element: <OverviewEcommercePage /> },
      // { path: 'analytics', element: <OverviewAnalyticsPage /> },
      // { path: 'banking', element: <OverviewBankingPage /> },
      // { path: 'booking', element: <OverviewBookingPage /> },
      {
        path: 'employee',
        children: [
          { element: <UserListPage />, index: true },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
        ],
      },

      {
        path: 'chatbot',
        children: [
          { element: <ChatbotListPage />, index: true },
          { path: 'list', element: <ChatbotListPage /> },
          { path: 'new', element: <ChatbotCreatePage /> },
          { path: ':id/edit', element: <ChatbotEditPage /> },
        ],
      },

      // {
      //   path: 'product',
      //   children: [
      //     { element: <ProductListPage />, index: true },
      //     { path: 'list', element: <ProductListPage /> },
      //     { path: ':id', element: <ProductDetailsPage /> },
      //     { path: 'new', element: <ProductCreatePage /> },
      //     { path: ':id/edit', element: <ProductEditPage /> },
      //   ],
      // },
      {
        path: 'admin',
        children: [
          { element: <AdminListPage />, index: true },
          { path: 'list', element: <AdminListPage /> },
          { path: 'new', element: <AdminCreatePage /> },
          { path: ':id/edit', element: <AdminEditPage /> },
        ],
      },
      // { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      // { path: 'calendar', element: <CalendarPage /> },
    ],
  },
];
