import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products'],
  endpoints: (builder) => {
    return {
      verifiedEmail: builder.mutation({
        query: ({ code, email }) => ({
          url: '/auth/verify-email',
          method: 'POST',
          body: {
            code: code,
            email: email,
          },
        }),
      }),
      resendEmail: builder.mutation({
        query: (email) => ({
          url: '/auth/send-code-email',
          method: 'POST',
          body: {
            email: email,
          },
        }),
      }),
      registerUser: builder.mutation({
        query: (form) => ({
          url: '/auth/register',
          method: 'POST',
          body: form,
        }),
      }),
      loginUser: builder.mutation({
        query: (form) => ({
          url: '/auth/login',
          method: 'POST',
          body: form,
        }),
      }),
    };
  },
});

export const {
  useVerifiedEmailMutation,
  useResendEmailMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
