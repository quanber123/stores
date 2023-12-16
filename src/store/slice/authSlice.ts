import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  user: {
    email: string | null;
    name: string | null;
    image: string | null;
    isVerified: boolean;
  };
};
const initialState: InitialState = {
  user: {
    email: null,
    name: null,
    image: null,
    isVerified: false,
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      action.payload.accessToken
        ? window.localStorage.setItem('accessToken', action.payload.accessToken)
        : '';
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.user.image = action.payload.user.image;
      state.user.isVerified = action.payload.user.isVerified;
    },
    removeAuth: (state) => {
      window.localStorage.removeItem('accessToken');
      state.user.email = null;
      state.user.name = null;
      state.user.image = null;
      state.user.isVerified = false;
    },
  },
});
export const authInfo = (state: { auth: InitialState }) => state.auth.user;
export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
