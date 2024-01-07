import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  user: {
    _id: string | null;
    email: string | null;
    name: string | null;
    image: string | null;
    isVerified: boolean;
  };
  settings: {
    _id: string | null;
    user: string | null;
    created_at: string | null;
    updated_at: string | null;
    notifications:
      | Array<{
          _id: string;
          type: string;
          description: string;
          enabled: boolean;
          created_at: string;
        }>
      | [];
  };
};
const initialState: InitialState = {
  user: {
    _id: null,
    email: null,
    name: null,
    image: null,
    isVerified: false,
  },
  settings: {
    _id: null,
    user: null,
    created_at: null,
    updated_at: null,
    notifications: [],
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      action.payload.accessToken
        ? window.localStorage.setItem(
            'coza-store-token',
            action.payload.accessToken
          )
        : '';
      state.user._id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.user.image = action.payload.user.image;
      state.user.isVerified = action.payload.user.isVerified;
    },
    removeAuth: (state) => {
      window.localStorage.removeItem('coza-store-token');
      state.user._id = null;
      state.user.email = null;
      state.user.name = null;
      state.user.image = null;
      state.user.isVerified = false;
    },
    setSettings: (state, action) => {
      state.settings._id = action.payload.settings._id;
      state.settings.user = action.payload.settings.user;
      state.settings.notifications = [...action.payload.settings.notifications];
      state.settings.created_at = action.payload.settings.created_at;
      state.settings.updated_at = action.payload.settings.updated_at;
    },
  },
});
export const authInfo = (state: { auth: InitialState }) => state.auth.user;
export const getSettings = (state: { auth: InitialState }) =>
  state.auth.settings;
export const { setAuth, removeAuth, setSettings } = authSlice.actions;
export default authSlice.reducer;
