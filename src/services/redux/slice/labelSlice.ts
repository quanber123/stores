import { Category, Tag } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  categories: Category[];
  tags: Tag[];
};

const initialState: InitialState = {
  categories: [],
  tags: [],
};

const labelSlice = createSlice({
  name: 'labelSlice',
  initialState: initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setAllCategories, setAllTags } = labelSlice.actions;
export const getAllCategories = (state: { label: InitialState }) =>
  state.label.categories;
export const getAllTags = (state: { label: InitialState }) => state.label.tags;

export default labelSlice.reducer;
