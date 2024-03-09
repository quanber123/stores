import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/services/utils/providesList';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: [
    'Products',
    'Banners',
    'Carts',
    'Favorites',
    'FavoritesDetails',
    'Orders',
    'Reviews',
  ],
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: (query) => {
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
        query: (token) => ({
          url: `carts`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Carts'),
      }),
      createCart: builder.mutation({
        query: ({ token, cart }) => ({
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
        query: ({ token, id, product }) => ({
          url: `carts/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            product: product,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      deleteCartById: builder.mutation({
        query: ({ token, id }) => ({
          url: `carts/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      deleteManyCarts: builder.mutation({
        query: ({ token, products }) => ({
          url: 'carts',
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            products: products,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      getFavoriteByProduct: builder.query({
        query: (productId) => `/products/favorite/${productId}`,
        providesTags: (result) => providesList(result, 'FavoritesDetails'),
      }),
      getAllFavorites: builder.query({
        query: (token) => ({
          url: `users/favorites`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Favorites'),
      }),
      postFavorites: builder.mutation({
        query: ({ token, productId }) => ({
          url: 'users/favorites',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            productId: productId,
          },
        }),
        invalidatesTags: ['Favorites', 'FavoritesDetails'],
      }),
      createPayment: builder.mutation({
        query: ({ token, type, totalPrice, message, address, products }) => ({
          url: `create-payment-${type}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            totalPrice: totalPrice,
            products: products,
            message: message,
            address: address,
          },
        }),
        invalidatesTags: ['Carts', 'Orders'],
      }),
      getAllOrders: builder.query({
        query: ({ token, query }) => ({
          url: `orders?${query}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Orders'),
      }),
      getOrderById: builder.query({
        query: ({ token, id }) => ({
          url: `orders/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      updateOrder: builder.mutation({
        query: ({ token, orderId, status }) => ({
          url: `orders/${orderId}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            status: status,
          },
        }),
        invalidatesTags: ['Orders'],
      }),
      getReviews: builder.query({
        query: ({ id, query }) => `products/reviews/${id}?${query}`,
        providesTags: (result) => providesList(result, 'Reviews'),
      }),
      reviewsProduct: builder.mutation({
        query: ({ token, reviews }) => ({
          url: 'products/reviews',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: reviews,
        }),
        invalidatesTags: ['Orders', 'Reviews'],
      }),
      getAllStores: builder.query({
        query: () => `stores`,
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
  useGetFavoriteByProductQuery,
  useGetAllFavoritesQuery,
  usePostFavoritesMutation,
  useCreatePaymentMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useGetReviewsQuery,
  useReviewsProductMutation,
  useGetAllStoresQuery,
} = productApi;
