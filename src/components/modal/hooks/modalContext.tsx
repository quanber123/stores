import { Address } from '@/interfaces/interfaces';
import { createContext, useCallback, useReducer } from 'react';
type AlertModalState = {
  status: string;
  message: string;
};
type ConfirmModalState = {
  message: string;
  function: () => void;
};
type InitialState = {
  visibleLoginModal: boolean;
  visibleRegisterModal: boolean;
  visibleAlertModal?: AlertModalState;
  visibleConfirmModal: ConfirmModalState;
  visibleAddressModal: boolean;
  visibleAddAddressModal: boolean;
  visibleUpdateAddressModal: Address;
  visibleReviewsModal: any;
};
const SET_VISIBLE_MODAL = 'SET_VISIBLE_MODAL';
const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL';
const reducer = (state: InitialState, action: any) => {
  const currentModal = action.payload?.modal;
  const resetState = {} as InitialState;
  switch (action.type) {
    case SET_VISIBLE_MODAL:
      if (typeof action.payload?.modal === 'object') return currentModal;
      if (currentModal === null) return { ...resetState };
      return {
        ...resetState,
        [currentModal]: !state[currentModal as keyof InitialState],
      };
    case CLOSE_ALL_MODAL:
      return { ...resetState };

    default:
      return state;
  }
};
const initialState = {} as InitialState;
export type InitialModalContext = {
  state: InitialState;
  setVisibleModal: (modal: any) => void;
  closeAllModal: () => void;
};
export const ModalContext = createContext({} as InitialModalContext);

export const ModalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const setVisibleModal = useCallback((modal: any) => {
    dispatch({ type: SET_VISIBLE_MODAL, payload: { modal } });
  }, []);
  const closeAllModal = useCallback(() => {
    dispatch({ type: CLOSE_ALL_MODAL });
  }, []);
  const contextValue = {
    state,
    setVisibleModal,
    closeAllModal,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
