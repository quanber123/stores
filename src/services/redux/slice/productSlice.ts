import { Banner, Cart, Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  productsOverview: Product[];
  banners: Banner[];
  cart: {
    cart: Cart[];
    total: number;
  };
  totalPageProduct: number | string;
  currentPageProduct?: number;
  status: string;
  err: string | null;
};
const initialState: InitialState = {
  products: [],
  productsOverview: [],
  banners: [],
  cart: {
    cart: [],
    total: 0,
  },
  totalPageProduct: 0,
  currentPageProduct: 1,
  status: 'idle',
  err: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState: initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPageProduct = action.payload.totalPage;
      state.currentPageProduct = action.payload.currentPage;
    },
    setAllProductsOverview: (state, action) => {
      state.productsOverview = action.payload.products;
    },
    setAllBanners: (state, action) => {
      state.banners = action.payload;
    },
    setAllCarts: (state, action) => {
      state.cart.cart = action.payload.cart;
      state.cart.total = action.payload.total;
    },
  },
});
export const {
  setAllProducts,
  setAllProductsOverview,
  setAllBanners,
  setAllCarts,
} = productSlice.actions;
export const getAllProducts = (state: { products: InitialState }) =>
  state.products.products;
export const getAllProductsOverview = (state: { products: InitialState }) =>
  state.products.productsOverview;
export const getAllBanners = (state: { products: InitialState }) =>
  state.products.banners;
export const getAllCarts = (state: { products: InitialState }) =>
  state.products.cart;
export const getTotalPageProduct = (state: { products: InitialState }) =>
  state.products.totalPageProduct;
export const getCurrentPageProduct = (state: { products: InitialState }) =>
  state.products.currentPageProduct;
export default productSlice.reducer;
