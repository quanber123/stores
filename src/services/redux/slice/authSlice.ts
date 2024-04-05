import {
  Address,
  Cart,
  Favorite,
  Settings,
  User,
} from '@/interfaces/interfaces';
import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  token: string | null;
  user: User | null;
  settings: Settings | null;
  currDelivery: Address;
  cart: {
    cart: Cart[];
    total: number;
    // totalPage: number;
  };
  favorite: {
    favorite: Favorite;
    total: number;
  };
};
const initialState: InitialState = {
  token: window.localStorage.getItem('coza-store-token') || null,
  user: null,
  settings: null,
  currDelivery: {} as Address,
  cart: {
    cart: [],
    total: 0,
    // totalPage: 0,
  },
  favorite: {
    favorite: {} as Favorite,
    total: 0,
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload.settings;
    },
    setCurrDelivery: (state, action) => {
      state.currDelivery = action.payload;
    },
    setAllCarts: (state, action) => {
      state.cart.cart = action.payload.cart;
      state.cart.total = action.payload.total;
      // state.cart.totalPage = action.payload.totalPage;
    },
    setAllFavorites: (state, action) => {
      state.favorite.favorite = action.payload.favorite;
      state.favorite.total = action.payload.total;
    },
    removeAuth: (state) => {
      window.localStorage.removeItem('coza-store-token');
      state.settings = {} as Settings;
      state.currDelivery = {} as Address;
      state.cart = {
        cart: [],
        total: 0,
      };
      state.favorite = {
        favorite: {} as Favorite,
        total: 0,
      };
    },
  },
});
export const tokenUser = (state: { auth: InitialState }) => state.auth.token;
export const authInfo = (state: { auth: InitialState }) => state.auth.user;
export const getSettings = (state: { auth: InitialState }) =>
  state.auth.settings;
export const getCurrAddress = (state: { auth: InitialState }) =>
  state.auth.currDelivery;
export const getAllCarts = (state: { auth: InitialState }) => state.auth.cart;
export const getAllFavorites = (state: { auth: InitialState }) =>
  state.auth.favorite;
export const {
  setToken,
  setAuth,
  setSettings,
  setCurrDelivery,
  setAllCarts,
  setAllFavorites,
  removeAuth,
} = authSlice.actions;
export default authSlice.reducer;
