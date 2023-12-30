import { Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  productsOverview: Product[];
  quickViewProduct: {
    statusModal: boolean;
    productModal: Product;
  };
  totalPage: number;
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
  totalPage: 0,
  status: 'idle',
  err: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState: initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalPage = action.payload.totalPage;
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
export const getTotalPage = (state: { products: InitialState }) =>
  state.products.totalPage;
export default productSlice.reducer;
