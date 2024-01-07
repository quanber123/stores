import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Tags'],
  endpoints: (builder) => {
    return {
      getTags: builder.query({
        query: () => 'tags',
        providesTags: (result) => providesList(result, 'Tags'),
      }),
    };
  },
});
export const { useGetTagsQuery } = tagApi;
