import { Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  productsOverview: Product[];
  quickViewProduct: {
    statusModal: boolean;
    productModal: Product;
  };
  totalPageProduct: number | string;
  currentPageProduct?: number;
  status: string;
  err: string | null;
};
const defaultViewProduct = {} as Product;
const initialState: InitialState = {
  products: [],
  productsOverview: [],
  quickViewProduct: {
    statusModal: false,
    productModal: defaultViewProduct,
  },
  totalPageProduct: 0,
  currentPageProduct:
    Number(window.localStorage.getItem('store-current-product-page')) || 1,
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
      window.localStorage.setItem(
        'store-current-product-page',
        action.payload.currentPage
      );
    },
    setAllProductsOverview: (state, action) => {
      state.productsOverview = action.payload.products;
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct.statusModal = true;
      state.quickViewProduct.productModal = action.payload;
    },
    closeQuickViewProduct: (state) => {
      state.quickViewProduct.statusModal = false;
      state.quickViewProduct.productModal = defaultViewProduct;
    },
  },
});
export const {
  setAllProducts,
  setAllProductsOverview,
  setQuickViewProduct,
  closeQuickViewProduct,
} = productSlice.actions;
export const getAllProducts = (state: { products: InitialState }) =>
  state.products.products;
export const getAllProductsOverview = (state: { products: InitialState }) =>
  state.products.productsOverview;
export const getQuickViewProduct = (state: { products: InitialState }) =>
  state.products.quickViewProduct;
export const getTotalPageProduct = (state: { products: InitialState }) =>
  state.products.totalPageProduct;
export const getCurrentPageProduct = (state: { products: InitialState }) =>
  state.products.currentPageProduct;
export default productSlice.reducer;
