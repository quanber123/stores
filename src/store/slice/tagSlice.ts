import { Tag } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  tags: Tag[];
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  tags: [],
  status: 'idle',
  err: null,
};

const tagSlice = createSlice({
  name: 'tagSlice',
  initialState: initialState,
  reducers: {
    setAllTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setAllTags } = tagSlice.actions;
export const getAllTags = (state: { tags: InitialState }) => state.tags.tags;
export default tagSlice.reducer;
