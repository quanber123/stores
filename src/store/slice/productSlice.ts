import { Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  productsOverview: Product[];
  totalPage: number;
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  products: [],
  productsOverview: [],
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
  },
});
export const { setAllProducts, setAllProductsOverview } = productSlice.actions;
export const getAllProducts = (state: { products: InitialState }) =>
  state.products.products;
export const getAllProductsOverview = (state: { products: InitialState }) =>
  state.products.productsOverview;
export const getTotalPage = (state: { products: InitialState }) =>
  state.products.totalPage;
export default productSlice.reducer;
