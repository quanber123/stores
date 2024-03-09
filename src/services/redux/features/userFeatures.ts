import providesList from '@/services/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
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
        query: ({ token, code, email }) => ({
          url: 'auth/verify-email',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        query: ({ token, id, name, value }) => ({
          url: `users/profile`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            id: id,
            name: name,
            value: value,
          },
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      }),
      updateAvatar: builder.mutation({
        query: ({ token, id, file }) => ({
          url: `users/${id}/avatar`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: file,
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      }),
      getSettings: builder.query({
        query: ({ token, id }) => ({
          url: `settings/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Settings'),
      }),
      updatedSettings: builder.mutation({
        query: ({ token, id, enabled, idNotify }) => ({
          url: 'settings',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        query: (token) => ({
          url: 'users/address',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Address'),
      }),
      createAddress: builder.mutation({
        query: ({ token, body }) => ({
          url: 'users/address',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }),
        invalidatesTags: ['Address'],
      }),
      updateAddress: builder.mutation({
        query: ({ token, id, body }) => ({
          url: `users/address/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }),
        invalidatesTags: ['Address'],
      }),
      deleteAddress: builder.mutation({
        query: ({ token, id }) => ({
          url: `users/address/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ['Address'],
      }),
      sendContact: builder.mutation({
        query: (body) => ({
          url: `contact`,
          method: 'POST',
          body: {
            ...body,
          },
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
