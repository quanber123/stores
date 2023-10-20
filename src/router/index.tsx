import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';
const HomeViews = lazy(() => import('@/views/HomeViews'));
const AboutViews = lazy(() => import('@/views/AboutViews'));
const ShopViews = lazy(() => import('@/views/ShopViews'));
const BlogViews = lazy(() => import('@/views/BlogViews'));
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
        element: <ShopViews />,
      },
      {
        path: 'blog',
        element: <BlogViews />,
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
