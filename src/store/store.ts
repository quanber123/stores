import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slice/blogSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice';
import tagReducer from './slice/tagSlice';
import authReducer from './slice/authSlice';
import { productApi } from './features/productFeatures';
import { authApi } from './features/authFeatures';
import { tagApi } from './features/tagsFeatures';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    blogs: blogReducer,
    tags: tagReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      tagApi.middleware,
      authApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
