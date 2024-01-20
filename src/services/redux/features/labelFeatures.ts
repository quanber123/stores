import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Categories', 'Tags'],
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: () => 'categories',
        providesTags: (result) => providesList(result, 'Categories'),
      }),
      getTags: builder.query({
        query: () => 'tags',
        providesTags: (result) => providesList(result, 'Tags'),
      }),
    };
  },
});

export const { useGetCategoriesQuery, useGetTagsQuery } = labelApi;
