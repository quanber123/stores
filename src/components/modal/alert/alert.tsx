import { getVisibleAlertModal } from '@/store/slice/modalSlice';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import './alert.css';
function AlertModal() {
  const visibleModal = useSelector(getVisibleAlertModal);
  return visibleModal ? (
    <section
      className={`alert-modal ${visibleModal.message ? 'active' : ''} bg-${
        visibleModal.backgroundColor
      } text-${visibleModal.color}`}
    >
      {visibleModal.status === 'success' ? (
        <FaCheck className='text-lg' />
      ) : (
        <></>
      )}
      {visibleModal.status === 'failed' ? (
        <FaXmark className='text-lg' />
      ) : (
        <></>
      )}
      <p>{visibleModal.message}</p>
      <div className={`count-down-alert bg-${visibleModal.color}`}></div>
    </section>
  ) : (
    <></>
  );
}

export default AlertModal;
