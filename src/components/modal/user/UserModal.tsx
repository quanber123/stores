import { authInfo, removeAuth } from '@/store/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './UserModal.css';
import {
  getVisibleUserModal,
  setVisibleUserModal,
} from '@/store/slice/modalSlice';
function UserModal() {
  const dispatch = useDispatch();
  const user = useSelector(authInfo);
  const visibleModal = useSelector(getVisibleUserModal);
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open('http://localhost:3000/api/auth/logout', '_self');
  };
  console.log(`localhost:3000/public${user.image}`);
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
        <div className='mx-[26px] my-[16px] flex flex-col gap-[20px]'>
          <button className='w-full py-[12px] border-t border-b border-lightGray text-gray font-bold text-start'>
            Profile
          </button>
          <button className='text-gray font-bold text-start'>Settings</button>
          <button
            className='text-gray font-bold text-start'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserModal;
