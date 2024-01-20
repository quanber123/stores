import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import blogReducer from './slice/blogSlice';
import labelReducer from './slice/labelSlice';
import { productApi } from './features/productFeatures';
import { labelApi } from './features/labelFeatures';
import { userApi } from './features/userFeatures';
import { blogApi } from './features/blogFeatures';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    blogs: blogReducer,
    label: labelReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      blogApi.middleware,
      labelApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
