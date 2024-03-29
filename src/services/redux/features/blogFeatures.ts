import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/services/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => {
    return {
      getBlogs: builder.query({
        query: (query) => {
          if (!query)
            return `blogs?page=${
              window.localStorage.getItem('store-current-blog-page') || 1
            }`;
          return `blogs?${query.search}`;
        },
        providesTags: (result) => providesList(result, 'Blogs'),
      }),
      getBlogById: builder.query({
        query: (id) => `blogs/${id}`,
        providesTags: (result) => providesList(result, 'Blogs'),
      }),
      postComment: builder.mutation({
        query: ({ id, text }) => ({
          url: `blogs/${id}/comments`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'coza-store-token'
            )}`,
          },
          body: {
            text: text,
          },
        }),
        invalidatesTags: [{ type: 'Blogs', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, usePostCommentMutation } =
  blogApi;
