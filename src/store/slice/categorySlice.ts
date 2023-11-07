import { Category } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  categories: Category[];
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  categories: [],
  status: 'idle',
  err: null,
};

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setAllCategories } = categorySlice.actions;
export const getAllCategories = (state: { category: InitialState }) =>
  state.category.categories;
export default categorySlice.reducer;
