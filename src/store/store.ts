import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slice/blogSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice';
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productReducer,
    blogs: blogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
