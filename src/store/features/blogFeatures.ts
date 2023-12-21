import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Blogs', 'BlogDetails'],
  endpoints: (builder) => {
    return {
      getBlogs: builder.query({
        query: (query) => {
          if (!query) {
            return 'blogs';
          }

          const queryParams = [];

          if (query.category) {
            queryParams.push(`category=${query.category}`);
          }

          if (query.tag) {
            queryParams.push(`tag=${query.tag}`);
          }

          if (query.page) {
            queryParams.push(`page=${query.page}`);
          }

          const queryString = queryParams.join('&&');

          return `blogs?${queryString}`;
        },
        providesTags: (result) => providesList(result, 'Blogs'),
      }),
      getBlogById: builder.query({
        query: (id) => `blogs/${id}`,
        providesTags: (result) => providesList(result, 'BlogDetails'),
      }),
      postComment: builder.mutation({
        query: ({ id, userId, text }) => ({
          url: `blogs/${id}/comments`,
          method: 'POST',
          body: {
            userId: userId,
            text: text,
          },
        }),
        invalidatesTags: (__, _, id) => [{ type: 'BlogDetails', id }],
      }),
    };
  },
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, usePostCommentMutation } =
  blogApi;
