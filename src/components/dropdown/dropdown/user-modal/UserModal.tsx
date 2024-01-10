import { removeAuth } from '@/services/redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { FaGear, FaArrowRightFromBracket } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { User } from '@/interfaces/interfaces';
import { DropdownContext } from '../../hooks/dropdownContext';
import './UserModal.css';
type Props = {
  user: User;
};
const UserModal: React.FC<Props> = ({ user }) => {
  const { state, setVisibleDropdown } = useContext(DropdownContext);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open('http://localhost:3000/api/auth/logout', '_self');
  };
  return (
    <div
      className='relative text-semiBoldGray cursor-pointer'
      onClick={() => setVisibleDropdown('visibleUserDropdown')}
    >
      <img
        className='w-[32px] h-[32px] rounded-full cursor-pointer'
        src={user.image}
        alt={user.email}
      />
      <div
        className={`user-modal ${state.visibleUserDropdown ? 'active' : ''}`}
      >
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
  );
};

export default UserModal;
