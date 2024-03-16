import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './services/router';
import { Provider } from 'react-redux';
import { store } from './services/redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

console.log(import.meta.env.VITE_ENVIRONMENT);
console.log(import.meta.env.VITE_BACKEND_URL);

if (
  'serviceWorker' in navigator &&
  import.meta.env.VITE_ENVIRONMENT === 'production'
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
