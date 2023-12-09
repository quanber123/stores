import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  visibleLoginModal: boolean;
  visibleRegisterModal: boolean;
};
const initialState: InitialState = {
  visibleLoginModal: false,
  visibleRegisterModal: false,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setVisibleLoginModal: (state) => {
      if (state.visibleRegisterModal) {
        state.visibleRegisterModal = false;
      }
      state.visibleLoginModal = !state.visibleLoginModal;
    },
    setVisibleRegisterModal: (state) => {
      if (state.visibleLoginModal) {
        state.visibleLoginModal = false;
      }
      state.visibleRegisterModal = !state.visibleRegisterModal;
    },
  },
});
export const { setVisibleLoginModal, setVisibleRegisterModal } =
  modalSlice.actions;
export const getVisibleLoginModal = (state: { modal: InitialState }) =>
  state.modal.visibleLoginModal;
export const getVisibleRegisterModal = (state: { modal: InitialState }) =>
  state.modal.visibleRegisterModal;
export default modalSlice.reducer;
