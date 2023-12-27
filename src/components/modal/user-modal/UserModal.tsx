import { authInfo, removeAuth } from '@/store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserModal.css';
import {
  getVisibleUserModal,
  setVisibleUserModal,
} from '@/store/slice/modalSlice';
import {
  FaRegCircleUser,
  FaGear,
  FaArrowRightFromBracket,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
function UserModal() {
  const dispatch = useDispatch();
  const user = useSelector(authInfo);
  const visibleModal = useSelector(getVisibleUserModal);
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open('http://localhost:3000/api/auth/logout', '_self');
  };
  return user.email && user.name && user.image ? (
    <div
      className='relative text-semiBoldGray cursor-pointer'
      onClick={() => dispatch(setVisibleUserModal())}
    >
      <img
        className='w-[32px] h-[32px] rounded-full cursor-pointer'
        src={user.image}
        alt={user.email}
      />
      <div className={`user-modal ${visibleModal ? 'active' : ''}`}>
        <div className='mx-[26px] my-[16px] flex items-center gap-[20px]'>
          <img
            className='w-[42px] h-[42px] rounded-full'
            src={user.image}
            alt={user.name}
          />
          <div>
            <h3 className='font-bold text-base'>{user.name}</h3>
            <p className='text-darkGray'>{user.email.slice(0, 20)}...</p>
          </div>
        </div>
        <div className='mx-[26px] my-[16px] flex flex-col gap-[20px] text-darkGray font-bold'>
          {/* <Link
            to={''}
            className='w-full py-[12px] border-t border-b border-lightGray flex items-center gap-[15px]'
          >
            <FaRegCircleUser className='text-md' />
            <span>Profile</span>
          </Link> */}
          <Link to='/settings' className='flex items-center gap-[15px]'>
            <FaGear className='text-md' />
            <span>Settings</span>
          </Link>
          <Link
            to={''}
            className='flex items-center gap-[15px]'
            onClick={handleLogout}
          >
            <FaArrowRightFromBracket className='text-md' />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserModal;
