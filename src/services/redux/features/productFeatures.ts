import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/services/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
const token = window.localStorage.getItem('coza-store-token');

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Products', 'Banners', 'Carts'],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: (query) => {
          // if (!query) return `products?page=1`;
          return `products?${query.search}`;
        },
        providesTags: (result) => providesList(result, 'Products'),
      }),
      getProductById: builder.query({
        query: (id) => `products/${id}`,
        providesTags: (result) => providesList(result, 'Products'),
      }),
      getBanners: builder.query({
        query: () => 'banners',
        providesTags: (result) => providesList(result, 'Banners'),
      }),
      getAllCarts: builder.query({
        query: () => ({
          url: 'carts',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Carts'),
      }),
      createCart: builder.mutation({
        query: (cart) => ({
          url: 'carts',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            cart: cart,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      updateCart: builder.mutation({
        query: ({ id, product }) => ({
          url: `carts/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: product,
        }),
        invalidatesTags: ['Carts'],
      }),
      deleteCartById: builder.mutation({
        query: (id) => ({
          url: `carts/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      deleteManyCarts: builder.mutation({
        query: (products) => ({
          url: 'carts',
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: products,
        }),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetBannersQuery,
  useGetAllCartsQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartByIdMutation,
  useDeleteManyCartsMutation,
} = productApi;
