import { Settings, User } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  accessToken: string;
  user: User;
  settings: Settings;
};
const initialState: InitialState = {
  accessToken: window.localStorage.getItem('coza-store-token') || '',
  user: {} as User,
  settings: {} as Settings,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user._id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.user.image = action.payload.user.image;
      state.user.isVerified = action.payload.user.isVerified;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setSettings: (state, action) => {
      state.settings._id = action.payload.settings._id;
      state.settings.user = action.payload.settings.user;
      state.settings.notifications = [...action.payload.settings.notifications];
      state.settings.created_at = action.payload.settings.created_at;
      state.settings.updated_at = action.payload.settings.updated_at;
    },
    removeAuth: (state) => {
      window.localStorage.removeItem('coza-store-token');
      state.user = {} as User;
      state.settings = {} as Settings;
    },
  },
});
export const accessToken = (state: { auth: InitialState }) =>
  state.auth.accessToken;
export const authInfo = (state: { auth: InitialState }) => state.auth.user;
export const getSettings = (state: { auth: InitialState }) =>
  state.auth.settings;
export const { setAuth, setToken, setSettings, removeAuth } = authSlice.actions;
export default authSlice.reducer;
