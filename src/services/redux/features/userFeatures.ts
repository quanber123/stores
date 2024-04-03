import { getAuthToken } from '@/services/utils/getToken';
import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['Users', 'Settings', 'Address'],
  endpoints: (builder) => {
    return {
      getUser: builder.query({
        query: (token) => ({
          url: 'auth/get-user',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Users'),
      }),
      verifiedEmail: builder.mutation({
        query: ({ code, email }) => ({
          url: 'auth/verify-email',
          method: 'POST',
          body: {
            code: code,
            email: email,
          },
        }),
      }),
      resendEmail: builder.mutation({
        query: (email) => ({
          url: 'auth/send-code-email',
          method: 'POST',
          body: {
            email: email,
          },
        }),
      }),
      registerUser: builder.mutation({
        query: (form) => ({
          url: 'auth/register',
          method: 'POST',
          body: form,
        }),
      }),
      loginUser: builder.mutation({
        query: (form) => ({
          url: 'auth/login',
          method: 'POST',
          body: form,
        }),
      }),
      updateProfile: builder.mutation({
        query: ({ id, name, value }) => ({
          url: `users/profile`,
          method: 'PUT',
          body: {
            id: id,
            name: name,
            value: value,
          },
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      }),
      updateAvatar: builder.mutation({
        query: ({ id, file }) => ({
          url: `users/${id}/avatar`,
          method: 'PUT',
          body: file,
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      }),
      getSettings: builder.query({
        query: (id) => ({
          url: `settings/${id}`,
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'Settings'),
      }),
      updatedSettings: builder.mutation({
        query: ({ id, enabled, idNotify }) => ({
          url: 'settings',
          method: 'PUT',
          body: {
            id: id,
            enabled: enabled,
            idNotify: idNotify,
          },
        }),
        invalidatesTags: [{ type: 'Settings', id: 'LIST' }],
      }),
      getProvinces: builder.query({
        query: () => ({
          url: '/provinces/getAll',
          method: 'GET',
        }),
      }),
      getDistricts: builder.query({
        query: (code) => ({
          url: `/districts/getByProvince?provinceCode=${code}`,
          method: 'GET',
        }),
      }),
      getWards: builder.query({
        query: (code) => ({
          url: `/wards/getByDistrict?districtCode=${code}`,
          method: 'GET',
        }),
      }),
      getAddressUser: builder.query({
        query: () => ({
          url: 'users/address',
          method: 'GET',
        }),
        providesTags: (result) => providesList(result, 'Address'),
      }),
      createAddress: builder.mutation({
        query: (body) => ({
          url: 'users/address',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Address'],
      }),
      updateAddress: builder.mutation({
        query: ({ id, body }) => ({
          url: `users/address/${id}`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['Address'],
      }),
      deleteAddress: builder.mutation({
        query: (id) => ({
          url: `users/address/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Address'],
      }),
      sendContact: builder.mutation({
        query: (body) => ({
          url: `contact`,
          method: 'POST',
          body: body,
        }),
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useVerifiedEmailMutation,
  useResendEmailMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useGetSettingsQuery,
  useUpdatedSettingsMutation,
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
  useGetAddressUserQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSendContactMutation,
} = userApi;
