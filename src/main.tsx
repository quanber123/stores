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
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (let registration of registrations) {
        registration
          .unregister()
          .then((success) => {
            console.log('Service Worker unregistered:', success);
            navigator.serviceWorker
              .register('/sw.js')
              .then((registration) => {
                console.log(
                  'Service Worker registered with scope:',
                  registration.scope
                );
              })
              .catch((error) => {
                console.error('Error registering Service Worker:', error);
              });
          })
          .catch((error) => {
            console.error('Error unregistering Service Worker:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error getting Service Worker registrations:', error);
    });
}
