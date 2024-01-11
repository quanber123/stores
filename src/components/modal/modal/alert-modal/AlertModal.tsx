import { useContext } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import Modal from '@/Modal';
import { ModalContext } from '../../hooks/modalContext';
import './AlertModal.css';
function AlertModal() {
  const { state } = useContext(ModalContext);
  return (
    <Modal>
      <section
        className={`alert-modal ${
          state.visibleAlertModal?.message ? 'active' : ''
        }  ${
          state.visibleAlertModal?.status === 'success'
            ? 'bg-lightGreen text-green'
            : 'bg-bgRed text-darkRed'
        }`}
      >
        {state.visibleAlertModal?.status === 'success' ? (
          <FaCheck className='text-lg' />
        ) : (
          <></>
        )}
        {state.visibleAlertModal?.status === 'failed' ? (
          <FaXmark className='text-lg' />
        ) : (
          <></>
        )}
        <p className='text-sm'>{state.visibleAlertModal?.message}</p>
        <div
          className={`count-down-alert  ${
            state.visibleAlertModal?.status === 'success'
              ? 'bg-green'
              : 'bg-darkRed'
          }`}
        ></div>
      </section>
    </Modal>
  );
}
export default AlertModal;
