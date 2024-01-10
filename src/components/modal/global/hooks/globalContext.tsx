import { createContext, useCallback, useReducer } from 'react';
type AlertModalState = {
  status: string;
  message: string;
};
type InitialState = {
  visibleLoginModal: boolean;
  visibleRegisterModal: boolean;
  visibleAlertModal?: AlertModalState;
};
const SET_VISIBLE_MODAL = 'SET_VISIBLE_MODAL';
const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL';
const reducer = (state: InitialState, action: any) => {
  const currentModal = action.payload?.modal;
  const resetState: InitialState = {
    visibleLoginModal: false,
    visibleRegisterModal: false,
    visibleAlertModal: {} as AlertModalState,
  };
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
const initialState: InitialState = {
  visibleAlertModal: {} as AlertModalState,
  visibleLoginModal: false,
  visibleRegisterModal: false,
};
export type InitialGlobalModalContext = {
  state: InitialState;
  setVisibleModal: (modal: any) => void;
  closeAllModal: () => void;
};
export const GlobalModalContext = createContext(
  {} as InitialGlobalModalContext
);

export const GlobalModalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    <GlobalModalContext.Provider value={contextValue}>
      {children}
    </GlobalModalContext.Provider>
  );
};