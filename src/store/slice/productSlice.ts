import { Product } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  products: Product[];
  totalPage: number;
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  products: [],
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
  },
});
export const { setAllProducts } = productSlice.actions;
export const getAllProducts = (state: { products: InitialState }) =>
  state.products.products;
export const getTotalPage = (state: { products: InitialState }) =>
  state.products.totalPage;
export default productSlice.reducer;
