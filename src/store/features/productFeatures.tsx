import { Category, Product } from '@/interfaces/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => {
    return {
      getCategories: builder.query<Category[], void>({
        query: () => 'categories',
        providesTags: ['Categories'],
      }),
      getProducts: builder.query<
        Product[],
        void | {
          category?: string;
          tag?: string;
          arrange?: string;
          page?: number;
        }
      >({
        query: (query) =>
          query
            ? `products?category=${query.category}&&tag=${query.tag}&&arrange=${query.arrange}&&page=${query.page}`
            : `products`,
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
