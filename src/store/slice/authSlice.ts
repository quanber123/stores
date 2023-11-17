import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  token: string | null;
  user: {
    username: string | null;
    name: string | null;
    imageSrc: string | null;
  };
};
const initialState: InitialState = {
  token: window.localStorage.getItem('accessToken') || null,
  user: {
    username: null,
    name: null,
    imageSrc: null,
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log(action.payload);
      if (!state.token) {
        state.token = action.payload.accessToken;
        window.localStorage.setItem('accessToken', action.payload.accessToken);
      }
      state.user.username = action.payload.user.username;
      state.user.name = action.payload.user.name;
      state.user.imageSrc = action.payload.user.imageSrc;
    },
    removeAuth: (state) => {
      state.token = null;
      state.user.username = null;
      state.user.name = null;
      state.user.imageSrc = null;
      window.localStorage.removeItem('accessToken');
    },
  },
});
export const authInfo = (state: { auth: InitialState }) => state.auth;
export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
