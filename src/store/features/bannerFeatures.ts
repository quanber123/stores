import providesList from '@/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const end_point = import.meta.env.VITE_BACKEND_URL;

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}`,
  }),
  tagTypes: ['Banners'],
  endpoints: (builder) => {
    return {
      getBanners: builder.query({
        query: () => 'banners',
        providesTags: (result) => providesList(result, 'Banners'),
      }),
    };
  },
});

export const { useGetBannersQuery } = bannerApi;
