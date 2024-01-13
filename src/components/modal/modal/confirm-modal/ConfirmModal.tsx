import Modal from '@/Modal';
import { useCallback, useContext } from 'react';
import { ModalContext } from '../../hooks/modalContext';
const ConfirmModal = () => {
  const { state, closeAllModal } = useContext(ModalContext);
  const closeModal = useCallback(() => {
    state.visibleConfirmModal.function();
    closeAllModal();
  }, [state.visibleConfirmModal]);
  return (
    <Modal>
      <div
        className={`${
          state.visibleConfirmModal.message ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-full bg-overlayBlack z-[1000] flex justify-center items-center`}
      >
        <div className='container p-8 bg-white max-w-[360px] flex flex-col gap-[20px]'>
          <p>{state.visibleConfirmModal.message}</p>
          <div className='flex justify-center gap-[40px]'>
            <button
              className='bg-black hover:bg-purple text-white rounded-[2px] px-4 py-2'
              onClick={closeAllModal}
            >
              Return
            </button>
            <button onClick={closeModal}>Yes</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
