import { ModalContext } from '@/components/modal/hooks/modalContext';
import React, { useCallback, useContext, useRef } from 'react';

const useClickOutside = (modal: string) => {
  const { setVisibleModal } = useContext(ModalContext);
  const modalRef = useRef<HTMLElement | HTMLFormElement | null>(null);
  const clickOutside = useCallback(
    (e: React.MouseEvent) => {
      const dialogDemission = modalRef.current?.getBoundingClientRect();
      if (
        e.clientX < dialogDemission!.left ||
        e.clientX > dialogDemission!.right ||
        e.clientY < dialogDemission!.top ||
        e.clientY > dialogDemission!.bottom
      ) {
        setVisibleModal(modal);
      }
    },
    [setVisibleModal, modalRef, modal]
  );
  return [modalRef, clickOutside] as const;
};

export default useClickOutside;
