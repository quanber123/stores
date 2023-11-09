import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/interfaces/interfaces';
const end_point = import.meta.env.VITE_BACKEND_URL;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}/products` }),
  tagTypes: ['Product'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query<Product, void>({
        query: () => ({
          url: '',
          method: 'GET',
        }),
        transformErrorResponse: (res) => {
          console.log(res);
        },
        providesTags: ['Product'],
      }),
    };
  },
});

export const { useGetProductsQuery } = productApi;
