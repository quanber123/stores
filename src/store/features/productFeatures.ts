import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: (query) => {
          if (!query) {
            return 'products';
          }

          const queryParams = [];

          if (query.category) {
            queryParams.push(`category=${query.category}`);
          }

          if (query.tag) {
            queryParams.push(`tag=${query.tag}`);
          }

          if (query.arrange) {
            queryParams.push(`arrange=${query.arrange}`);
          }

          if (query.page) {
            queryParams.push(`page=${query.page}`);
          }

          const queryString = queryParams.join('&&');

          return `products?${queryString}`;
        },
        providesTags: (result) => providesList(result, 'Products'),
      }),
      getProductById: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (result) => providesList(result, 'Products'),
      }),
    };
  },
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
