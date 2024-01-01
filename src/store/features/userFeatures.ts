import providesList from '@/utils/providesList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const end_point = import.meta.env.VITE_BACKEND_URL;
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${end_point}` }),
  tagTypes: ['Users', 'Settings'],
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
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'accessToken'
            )}`,
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
        query: (value) => ({
          url: `users/avatar`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'accessToken'
            )}`,
          },
          body: value,
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }],
      }),
      getSettings: builder.query({
        query: (id) => ({
          url: `settings/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'accessToken'
            )}`,
          },
        }),
        providesTags: (result) => providesList(result, 'Settings'),
      }),
      updatedSettings: builder.mutation({
        query: ({ id, enabled, idNotify }) => ({
          url: 'settings',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'accessToken'
            )}`,
          },
          body: {
            id: id,
            enabled: enabled,
            idNotify: idNotify,
          },
        }),
        invalidatesTags: [{ type: 'Settings', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useGetUserQuery,
  // useGetUserSuccessQuery,
  useVerifiedEmailMutation,
  useResendEmailMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useGetSettingsQuery,
  useUpdatedSettingsMutation,
} = userApi;
