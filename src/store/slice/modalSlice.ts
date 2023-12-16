import { createSlice } from '@reduxjs/toolkit';
type AlertModalState = {
  status: string;
  message: string;
};
type InitialState = {
  visibleLoginModal: boolean;
  visibleRegisterModal: boolean;
  visibleCartModal: boolean;
  visibleFavoriteModal: boolean;
  visibleNotificationsModal: boolean;
  visibleUserModal: boolean;
  visibleAlertModal?: AlertModalState;
};
type ModalType = keyof InitialState;
const initialState: InitialState = {
  visibleLoginModal: false,
  visibleRegisterModal: false,
  visibleCartModal: false,
  visibleFavoriteModal: false,
  visibleNotificationsModal: false,
  visibleUserModal: false,
  visibleAlertModal: {
    status: '',
    message: '',
  },
};
const resetModal = (state: InitialState, currentModal: ModalType | null) => {
  const resetState: InitialState = {
    visibleLoginModal: false,
    visibleRegisterModal: false,
    visibleCartModal: false,
    visibleFavoriteModal: false,
    visibleNotificationsModal: false,
    visibleUserModal: false,
  };
  if (currentModal === null) {
    return { ...resetState };
  }
  return { ...resetState, [currentModal]: !state[currentModal] };
};
const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setVisibleLoginModal: (state) => resetModal(state, 'visibleLoginModal'),
    setVisibleRegisterModal: (state) =>
      resetModal(state, 'visibleRegisterModal'),
    setVisibleCartModal: (state) => resetModal(state, 'visibleCartModal'),
    setVisibleFavoriteModal: (state) =>
      resetModal(state, 'visibleFavoriteModal'),
    setVisibleNotificationsModal: (state) =>
      resetModal(state, 'visibleNotificationsModal'),
    setVisibleUserModal: (state) => resetModal(state, 'visibleUserModal'),
    setVisibleAlertModal: (state, action) => {
      state.visibleAlertModal = action.payload;
    },
    closeAllModal: (state) => resetModal(state, null),
  },
});
export const {
  setVisibleLoginModal,
  setVisibleRegisterModal,
  setVisibleCartModal,
  setVisibleFavoriteModal,
  setVisibleNotificationsModal,
  setVisibleUserModal,
  setVisibleAlertModal,
  closeAllModal,
} = modalSlice.actions;
export const getVisibleLoginModal = (state: { modal: InitialState }) =>
  state.modal.visibleLoginModal;
export const getVisibleRegisterModal = (state: { modal: InitialState }) =>
  state.modal.visibleRegisterModal;
export const getVisibleCartModal = (state: { modal: InitialState }) =>
  state.modal.visibleCartModal;
export const getVisibleFavoriteModal = (state: { modal: InitialState }) =>
  state.modal.visibleFavoriteModal;
export const getVisibleNotificationsModal = (state: { modal: InitialState }) =>
  state.modal.visibleNotificationsModal;
export const getVisibleUserModal = (state: { modal: InitialState }) =>
  state.modal.visibleUserModal;
export const getVisibleAlertModal = (state: { modal: InitialState }) =>
  state.modal.visibleAlertModal;
export default modalSlice.reducer;
