import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import bannerReducer from './slice/bannerSlice';
import cartReducer from './slice/cartSlice';
import favoriteReucer from './slice/favoriteSlice';
import blogReducer from './slice/blogSlice';
import categoryReducer from './slice/categorySlice';
import tagReducer from './slice/tagSlice';
import modalReducer from './slice/modalSlice';
import { productApi } from './features/productFeatures';
import { authApi } from './features/authFeatures';
import { tagApi } from './features/tagsFeatures';
import { emailApi } from './features/emailFeatures';
import { categoryApi } from './features/categoryFeatures';
import { userApi } from './features/userFeatures';
import { bannerApi } from './features/bannerFeatures';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    banners: bannerReducer,
    blogs: blogReducer,
    cart: cartReducer,
    favorite: favoriteReucer,
    category: categoryReducer,
    tags: tagReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      emailApi.middleware,
      productApi.middleware,
      bannerApi.middleware,
      tagApi.middleware,
      categoryApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
