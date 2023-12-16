import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';
const HomeViews = lazy(() => import('@/views/HomeViews'));
const AboutViews = lazy(() => import('@/views/AboutViews'));
const ShopViews = lazy(() => import('@/views/ShopViews'));
const ProductDetailsViews = lazy(() => import('@/views/ProductDetailsViews'));
const BlogViews = lazy(() => import('@/views/BlogViews'));
const BlogDetailsViews = lazy(() => import('@/views/BlogDetailsViews'));
const Auth = lazy(() => import('@/components/auth/Auth'));
const VerifiedAccount = lazy(() => import('@/components/auth/VerifiedAccount'));
const NotFoundViews = lazy(() => import('@/views/NotFoundViews'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
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
        path: 'blog',
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
        element: <Auth />,
        children: [
          {
            index: true,
            element: <VerifiedAccount />,
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
