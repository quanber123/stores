import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
interface User {
  accessToken: string;
  admin: {
    username: string;
    name: string;
    imageSrc: string;
  };
  tokenExpiration: string;
}
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}/auth`,
  }),
  endpoints: (builder) => {
    return {
      loginByGoogle: builder.mutation<User, string>({
        query: (code) => ({
          url: '/login-google',
          method: 'POST',
          body: { code: code },
        }),
      }),
    };
  },
});

export const { useLoginByGoogleMutation } = authApi;
