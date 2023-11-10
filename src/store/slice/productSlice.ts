import { Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  productDetails: Product | null;
  relatedProducts: Product[];
  totalPage: number;
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  products: [],
  productDetails: null,
  relatedProducts: [],
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
    setProductDetails: (state, action) => {
      state.productDetails = action.payload.product;
    },
    setRelatedProducts: (state, action) => {
      state.relatedProducts = action.payload.relatedProducts;
    },
  },
});
export const { setAllProducts, setProductDetails, setRelatedProducts } =
  productSlice.actions;
export const getAllProducts = (state: { products: InitialState }) =>
  state.products.products;
export const getTotalPage = (state: { products: InitialState }) =>
  state.products.totalPage;
export const getProductDetails = (state: { products: InitialState }) =>
  state.products.productDetails;
export const getRelatedProducts = (state: { products: InitialState }) =>
  state.products.relatedProducts;
export default productSlice.reducer;
