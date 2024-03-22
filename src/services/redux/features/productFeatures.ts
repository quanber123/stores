import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import providesList from '@/services/utils/providesList';
import { getAuthToken } from '@/services/utils/getToken';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${end_point}`,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
        query: ({ id, product }) => ({
          url: `carts/${id}`,
          method: 'PUT',
          body: {
            product: product,
          },
        }),
        invalidatesTags: ['Carts'],
      }),
      deleteCartById: builder.mutation({
        query: (id) => ({
          url: `carts/${id}`,
          method: 'DELETE',
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
        query: () => ({
          url: `users/favorites`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'Favorites'),
      }),
      postFavorites: builder.mutation({
        query: (productId) => ({
          url: 'users/favorites',
          method: 'POST',
          body: {
            productId: productId,
          },
        }),
        invalidatesTags: ['Favorites', 'FavoritesDetails'],
      }),
      createPayment: builder.mutation({
        query: ({
          type,
          totalPrice,
          user_name,
          phone,
          message,
          address,
          products,
        }) => ({
          url: `create-payment-${type}`,
          method: 'POST',
          body: {
            user_name: user_name,
            phone: phone,
            message: message,
            address: address,
            totalPrice: totalPrice,
            products: products,
          },
        }),
        invalidatesTags: ['Carts', 'Orders'],
      }),
      getAllOrders: builder.query({
        query: ({ query }) => ({
          url: `user_orders?${query}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'Orders'),
      }),
      getOrderById: builder.query({
        query: ({ id, paymentMethod }) => ({
          url: `user_orders/${id}?payment=${paymentMethod}`,
          method: 'GET',
        }),
      }),
      updateOrder: builder.mutation({
        query: ({ orderId, status, userId }) => ({
          url: `user_orders/${orderId}`,
          method: 'PUT',
          body: {
            status: status,
            userId: userId,
          },
        }),
        invalidatesTags: ['Orders'],
      }),
      getReviews: builder.query({
        query: ({ id, query }) => `products/reviews/${id}?${query}`,
        providesTags: (result) => providesList(result, 'Reviews'),
      }),
      reviewsProduct: builder.mutation({
        query: (reviews) => ({
          url: 'products/reviews',
          method: 'POST',
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
