import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Categories'],
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: () => 'categories',
        providesTags: (result) => providesList(result, 'Categories'),
      }),
    };
  },
});

export const { useGetCategoriesQuery } = categoryApi;
