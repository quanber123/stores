import { Blog } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogs: Blog[];
  blogOverView: Blog[];
  totalPageBlog: number;
  currentPageBlog: number;
  status: string;
  err: string | null;
};
const initialState: InitialState = {
  blogs: [],
  blogOverView: [],
  totalPageBlog: 0,
  currentPageBlog:
    Number(window.localStorage.getItem('store-current-blog-page')) || 1,
  status: 'idle',
  err: null,
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState: initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.totalPageBlog = action.payload.totalPage;
      state.currentPageBlog = action.payload.currentPage;
      window.localStorage.setItem(
        'store-current-blog-page',
        action.payload.currentPage
      );
    },
    setAllBlogsOverView: (state, action) => {
      state.blogOverView = action.payload.blogs;
    },
  },
});
export const { setAllBlogs, setAllBlogsOverView } = blogSlice.actions;
export const getAllBlogs = (state: { blogs: InitialState }) =>
  state.blogs.blogs;
export const getAllBlogsOverview = (state: { blogs: InitialState }) =>
  state.blogs.blogOverView;
export const getTotalPageBlog = (state: { blogs: InitialState }) =>
  state.blogs.totalPageBlog;
export const getCurrentPageBlog = (state: { blogs: InitialState }) =>
  state.blogs.currentPageBlog;
export default blogSlice.reducer;
