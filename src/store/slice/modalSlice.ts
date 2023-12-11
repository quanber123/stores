import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  visibleLoginModal: boolean;
  visibleRegisterModal: boolean;
  visibleCartModal: boolean;
  visibleFavoriteModal: boolean;
  visibleNotificationsModal: boolean;
};
const initialState: InitialState = {
  visibleLoginModal: false,
  visibleRegisterModal: false,
  visibleCartModal: false,
  visibleFavoriteModal: false,
  visibleNotificationsModal: false,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setVisibleLoginModal: (state) => {
      state.visibleRegisterModal = false;
      state.visibleNotificationsModal = false;
      state.visibleCartModal = false;
      state.visibleFavoriteModal = false;
      state.visibleLoginModal = !state.visibleLoginModal;
    },
    setVisibleRegisterModal: (state) => {
      state.visibleLoginModal = false;
      state.visibleNotificationsModal = false;
      state.visibleCartModal = false;
      state.visibleFavoriteModal = false;
      state.visibleRegisterModal = !state.visibleRegisterModal;
    },
    setVisibleCartModal: (state) => {
      state.visibleRegisterModal = false;
      state.visibleLoginModal = false;
      state.visibleFavoriteModal = false;
      state.visibleNotificationsModal = false;
      state.visibleCartModal = !state.visibleCartModal;
    },
    setVisibleNotificationsModal: (state) => {
      state.visibleRegisterModal = false;
      state.visibleLoginModal = false;
      state.visibleCartModal = false;
      state.visibleFavoriteModal = false;
      state.visibleNotificationsModal = !state.visibleNotificationsModal;
    },
    setVisibleFavoriteModal: (state) => {
      state.visibleRegisterModal = false;
      state.visibleLoginModal = false;
      state.visibleCartModal = false;
      state.visibleNotificationsModal = false;
      state.visibleFavoriteModal = !state.visibleFavoriteModal;
    },
  },
});
export const {
  setVisibleLoginModal,
  setVisibleRegisterModal,
  setVisibleCartModal,
  setVisibleNotificationsModal,
} = modalSlice.actions;
export const getVisibleLoginModal = (state: { modal: InitialState }) =>
  state.modal.visibleLoginModal;
export const getVisibleRegisterModal = (state: { modal: InitialState }) =>
  state.modal.visibleRegisterModal;
export const getVisibleCartModal = (state: { modal: InitialState }) =>
  state.modal.visibleCartModal;
export const getVisibleNotificationsModal = (state: { modal: InitialState }) =>
  state.modal.visibleNotificationsModal;
export default modalSlice.reducer;
