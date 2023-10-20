import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';
const HomeViews = lazy(() => import('@/views/HomeViews'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeViews />,
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
