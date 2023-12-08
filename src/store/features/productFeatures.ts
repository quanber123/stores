import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products', 'ProductsOverview'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: (query) =>
          query
            ? `products?category=${query.category}&&tag=${query.tag}&&arrange=${query.arrange}&&page=${query.page}`
            : `products`,
        providesTags: (result) => providesList(result, 'Products'),
      }),
      getProductOverview: builder.query({
        query: () => `products-overview`,
        providesTags: (result) => providesList(result, 'ProductsOverview'),
      }),
      getProductById: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (result) => providesList(result, 'Products'),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductOverviewQuery,
  useGetProductByIdQuery,
} = productApi;
