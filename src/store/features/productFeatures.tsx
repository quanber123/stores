import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}/products` }),
  tagTypes: ['Products'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: () => '',
        providesTags: ['Products'],
      }),
      getProductById: builder.query({
        query: (id) => `${id}`,
        providesTags: (_, __, id) => [{ type: 'Products', id }],
      }),
    };
  },
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
