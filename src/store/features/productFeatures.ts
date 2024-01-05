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
          if (!query)
            return `products?page=${
              window.localStorage.getItem('store-current-product-page') || 1
            }`;
          return `products?${query.search}`;
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
