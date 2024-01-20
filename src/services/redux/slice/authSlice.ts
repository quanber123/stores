import { Address, Settings, User } from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  accessToken: string;
  user: User;
  settings: Settings;
  currDelivery: Address;
};
const initialState: InitialState = {
  accessToken: window.localStorage.getItem('coza-store-token') || '',
  user: {} as User,
  settings: {} as Settings,
  currDelivery: {} as Address,
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
      window.localStorage.setItem('coza-store-token', action.payload);
    },
    setSettings: (state, action) => {
      state.settings._id = action.payload.settings._id;
      state.settings.user = action.payload.settings.user;
      state.settings.notifications = [...action.payload.settings.notifications];
      state.settings.created_at = action.payload.settings.created_at;
      state.settings.updated_at = action.payload.settings.updated_at;
    },
    setCurrDelivery: (state, action) => {
      state.currDelivery = action.payload;
    },
    removeAuth: (state) => {
      window.localStorage.removeItem('coza-store-token');
      (state.accessToken = ''), (state.user = {} as User);
      state.settings = {} as Settings;
      state.currDelivery = {} as Address;
    },
  },
});
export const accessToken = (state: { auth: InitialState }) =>
  state.auth.accessToken;
export const authInfo = (state: { auth: InitialState }) => state.auth.user;
export const getSettings = (state: { auth: InitialState }) =>
  state.auth.settings;
export const getCurrAddress = (state: { auth: InitialState }) =>
  state.auth.currDelivery;
export const { setAuth, setToken, setSettings, setCurrDelivery, removeAuth } =
  authSlice.actions;
export default authSlice.reducer;
