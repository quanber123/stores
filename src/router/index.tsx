import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';
import { GlobalModalProvider } from '@/components/modal/global/hooks/globalContext';
const HomeViews = lazy(() => import('@/views/(default)/HomeViews'));
const AboutViews = lazy(() => import('@/views/(default)/AboutViews'));
const ShopViews = lazy(() => import('@/views/(default)/ShopViews'));
const ProductDetailsViews = lazy(
  () => import('@/views/(default)/ProductDetailsViews')
);
const BlogViews = lazy(() => import('@/views/(default)/BlogViews'));
const BlogDetailsViews = lazy(
  () => import('@/views/(default)/BlogDetailsViews')
);
const Auth = lazy(() => import('@/auth/Auth'));
const SettingViews = lazy(() => import('@/views/(logged-in)/SettingViews'));
const VerifiedAccountViews = lazy(
  () => import('@/views/(default)/VerifiedAccountViews')
);
const CartViews = lazy(() => import('@/views/(logged-in)/CartViews'));
const NotFoundViews = lazy(() => import('@/views/(default)/NotFoundViews'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GlobalModalProvider>
        <App />
      </GlobalModalProvider>
    ),
    children: [
      {
        index: true,
        element: <HomeViews />,
      },
      {
        path: 'about',
        element: <AboutViews />,
      },
      {
        path: 'shop',
        children: [
          {
            index: true,
            element: <ShopViews />,
          },
          {
            path: ':id',
            element: <ProductDetailsViews />,
          },
        ],
      },
      {
        path: 'blogs',
        children: [
          {
            index: true,
            element: <BlogViews />,
          },
          {
            path: ':id',
            element: <BlogDetailsViews />,
          },
        ],
      },
      {
        path: 'verified',
        element: <VerifiedAccountViews />,
      },
      {
        path: '',
        element: <Auth />,
        children: [
          {
            path: 'settings',
            element: <SettingViews />,
          },
          {
            path: 'cart',
            element: <CartViews />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundViews />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
  future: {
    v7_normalizeFormMethod: true,
  },
});

export default router;
