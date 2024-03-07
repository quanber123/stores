import { removeAuth } from '@/services/redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { FaClipboard, FaGear, FaArrowRightFromBracket } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { User } from '@/interfaces/interfaces';
import { DropdownContext } from '../../hooks/dropdownContext';
import './UserDropdown.css';
type Props = {
  user: User;
};
const UserDropdown: React.FC<Props> = ({ user }) => {
  const { state, setVisibleDropdown } = useContext(DropdownContext);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/logout`, '_self');
  };
  return (
    <div
      className='relative text-semiBoldGray cursor-pointer'
      onClick={() => setVisibleDropdown('visibleUserDropdown')}
    >
      <img
        className='w-[32px] h-[32px] rounded-full cursor-pointer'
        src={user.image}
        alt={user.name}
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
            <p className='text-darkGray'>{user.name.slice(0, 20)}...</p>
          </div>
        </div>
        <div className='mx-[26px] my-[16px] flex flex-col gap-[20px] text-darkGray font-bold'>
          <Link to='/purchase?page=1' className='flex items-center gap-[15px]'>
            <FaClipboard className='text-md' />
            <span>My Purchase</span>
          </Link>
          <Link to='/settings' className='flex items-center gap-[15px]'>
            <FaGear className='text-md' />
            <span>Settings</span>
          </Link>
          <button
            className='flex items-center gap-[15px]'
            onClick={handleLogout}
          >
            <FaArrowRightFromBracket className='text-md' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
