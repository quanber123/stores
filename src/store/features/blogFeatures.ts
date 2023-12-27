import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Blogs'],
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
        providesTags: (result) => providesList(result, 'Blogs'),
      }),
      postComment: builder.mutation({
        query: ({ id, userId, text }) => ({
          url: `blogs/${id}/comments`,
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: {
            userId: userId,
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
