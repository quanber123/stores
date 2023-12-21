import {
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import { useDispatch } from 'react-redux';

function Buttons() {
  const dispatch = useDispatch();
  return (
    <div className='ml-auto flex items-center gap-[20px]'>
      <button
        className='hidden tablet:block font-bold'
        onClick={() => dispatch(setVisibleLoginModal())}
      >
        Login
      </button>
      <button
        className='px-5 py-2 font-bold bg-darkGray text-white hover:bg-purple rounded-[28px]'
        onClick={() => dispatch(setVisibleRegisterModal())}
      >
        Register
      </button>
    </div>
  );
}

export default Buttons;
