import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const end_point = import.meta.env.VITE_BACKEND_URL;

export const emailApi = createApi({
  reducerPath: 'emailApi',
  tagTypes: ['Email'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}/email`,
  }),
  endpoints: (builder) => {
    return {
      postEmail: builder.mutation({
        query: (email) => ({
          url: '',
          method: 'POST',
          body: { email: email },
        }),
      }),
    };
  },
});
export const { usePostEmailMutation } = emailApi;
