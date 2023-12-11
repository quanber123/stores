import providesList from '@/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}/auth`,
  }),
  endpoints: (builder) => {
    return {
      getUser: builder.query({
        query: (token) => ({
          url: 'get-user',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Auth'),
      }),
    };
  },
});

export const { useGetUserQuery } = authApi;
