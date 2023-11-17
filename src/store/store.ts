import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slice/blogSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice';
import authReducer from './slice/authSlice';
import { productApi } from './features/productFeatures';
import { authApi } from './features/authFeatures';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    blogs: blogReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
