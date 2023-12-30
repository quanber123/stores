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
          const queryParams = [
            query.category && `category=${query.category}`,
            query.tag && `tag=${query.tag}`,
            query.price && `price=${query.price}`,
            query.price
              ? query.price && `price=${query.price}`
              : query.date && `date=${query.date}`,
            query.page && `page=${query.page}`,
          ];
          const queryString = queryParams.filter(Boolean).join('&');

          return `products${queryString ? `?${queryString}` : ''}`;
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
