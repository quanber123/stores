import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: () => 'categories',
        providesTags: ['Categories'],
      }),
      getProducts: builder.query({
        query: (query) =>
          `products?category=${query.category}&&page=${query.page}`,
        providesTags: ['Products'],
      }),
      getProductById: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (_, __, id) => [{ type: 'Products', id }],
      }),
    };
  },
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
