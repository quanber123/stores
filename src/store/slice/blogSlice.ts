import { Blog } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogs: Blog[];
  blogDetails: Blog;
  totalPage: number;
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
    setBlogsDetails: (state, action) => {
      state.blogDetails = action.payload.blog;
    },
  },
});
export const { setAllBlogs, setBlogsDetails } = blogSlice.actions;
export const getAllBlogs = (state: { blogs: InitialState }) =>
  state.blogs.blogs;
export const getBlogDetails = (state: { blogs: InitialState }) =>
  state.blogs.blogDetails;
export const getTotalPageBlogs = (state: { blogs: InitialState }) =>
  state.blogs.totalPage;
export default blogSlice.reducer;
