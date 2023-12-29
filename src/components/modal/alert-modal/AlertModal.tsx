import { getVisibleAlertModal } from '@/store/slice/modalSlice';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import './AlertModal.css';
import Modal from '@/Modal';
function AlertModal() {
  const visibleModal = useSelector(getVisibleAlertModal);
  return (
    <Modal>
      <section
        className={`alert-modal ${visibleModal?.message ? 'active' : ''}  ${
          visibleModal?.status === 'success'
            ? 'bg-lightGreen text-green'
            : 'bg-bgRed text-darkRed'
        }`}
      >
        {visibleModal?.status === 'success' ? (
          <FaCheck className='text-lg' />
        ) : (
          <></>
        )}
        {visibleModal?.status === 'failed' ? (
          <FaXmark className='text-lg' />
        ) : (
          <></>
        )}
        <p className='text-sm'>{visibleModal?.message}</p>
        <div
          className={`count-down-alert  ${
            visibleModal?.status === 'success' ? 'bg-green' : 'bg-darkRed'
          }`}
        ></div>
      </section>
    </Modal>
  );
}
export default AlertModal;
