import { Blog } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogs: Blog[];
  blogDetails: Blog;
  blogOverView: Blog[];
  totalPageBlog: number;
  currentPageBlog: number;
  status: string;
  err: string | null;
};
const defaultBlogDetails: Blog = {
  _id: '',
  author: '',
  imgSrc: '',
  title: '',
  open_paragraph: '',
  body_paragraph: '',
  close_paragraph: '',
  quotes: '',
  category: { _id: '', name: '' },
  tags: [{ _id: '', name: '' }],
  views: 0,
  totalComments: 0,
  created_at: '',
  updated_at: '',
  comments: [
    {
      user: {
        _id: '',
        name: '',
        image: '',
      },
      text: '',
      created_at: '',
    },
  ],
};

const initialState: InitialState = {
  blogs: [],
  blogDetails: defaultBlogDetails,
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
    setBlogsDetails: (state, action) => {
      state.blogDetails = action.payload.blog;
    },
  },
});
export const { setAllBlogs, setAllBlogsOverView, setBlogsDetails } =
  blogSlice.actions;
export const getAllBlogs = (state: { blogs: InitialState }) =>
  state.blogs.blogs;
export const getAllBlogsOverview = (state: { blogs: InitialState }) =>
  state.blogs.blogOverView;
export const getBlogDetails = (state: { blogs: InitialState }) =>
  state.blogs.blogDetails;
export const getTotalPageBlog = (state: { blogs: InitialState }) =>
  state.blogs.totalPageBlog;
export const getCurrentPageBlog = (state: { blogs: InitialState }) =>
  state.blogs.currentPageBlog;
export default blogSlice.reducer;
