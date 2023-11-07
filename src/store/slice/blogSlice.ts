import { Blog } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogs: Blog[];
  totalPage: number;
  status: string;
  err: string | null;
};

const initialState: InitialState = {
  blogs: [],
  totalPage: 0,
  status: 'idle',
  err: null,
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState: initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.totalPage = action.payload.totalPage;
    },
  },
});
export const { setAllBlogs } = blogSlice.actions;
export const getAllBlogs = (state: { blogs: InitialState }) =>
  state.blogs.blogs;
export default blogSlice.reducer;
