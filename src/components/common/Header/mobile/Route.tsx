import { DropdownContext } from '@/components/dropdown/hooks/dropdownContext';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import scrollElement from '@/services/utils/scroll-elements';
import { useCallback, useContext, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaRightToBracket,
  FaHouseChimney,
  FaCircleInfo,
  FaStore,
  FaNewspaper,
  FaBell,
  FaHeart,
  FaCartShopping,
  FaClipboard,
  FaGear,
  FaArrowRightFromBracket,
} from 'react-icons/fa6';
import { useAuth } from '@/context/AuthProvider';
import { useDispatch } from 'react-redux';
import { removeAuth } from '@/services/redux/slice/authSlice';

type Props = {
  dropdownRoutes: boolean;
  handleDropdownRoutes: () => void;
};
const Route: React.FC<Props> = ({ dropdownRoutes, handleDropdownRoutes }) => {
  const { closeAllModal, setVisibleModal } = useContext(ModalContext);
  const { closeDropdown } = useContext(DropdownContext);
  const dispatch = useDispatch();
  const user = useAuth();

  const routes = [
    {
      link: '/',
      icon: <FaHouseChimney className='text-base' />,
    },
    {
      link: 'about',
      icon: <FaCircleInfo className='text-base' />,
    },
    {
      link: 'shop?page=1',
      icon: <FaStore className='text-base' />,
    },
    { link: 'blog?page=1', icon: <FaNewspaper className='text-base' /> },
    // {
    //   link: 'contact',
    // },
  ];
  const redirect = useCallback(() => {
    closeAllModal();
    closeDropdown();
    scrollElement();
    handleDropdownRoutes();
  }, []);
  const handleLogin = useCallback(() => {
    handleDropdownRoutes();
    setVisibleModal('visibleLoginModal');
  }, []);
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open(`${import.meta.env.VITE_BACKEND_URL}auth/logout`, '_self');
  };
  const route = useMemo(() => {
    return routes.map((r, index) => {
      return (
        <li key={index} className='capitalize'>
          <NavLink
            to={r.link}
            className={({ isActive }) =>
              isActive ? 'text-purple w-max' : 'w-max'
            }
            onClick={redirect}
            // state={{ prevUrl: location.pathname }}
            end
          >
            <div className='flex items-center gap-[20px]'>
              {r.icon}
              <p>{r.link === '/' ? 'home' : r.link.split('?')[0]}</p>
            </div>
          </NavLink>
        </li>
      );
    });
  }, [routes]);
  return (
    <section
      className={`fixed top-0 left-0 ${
        dropdownRoutes ? 'w-full' : 'w-0'
      } h-full bg-overlayGray transition-all overflow-y-auto flex flex-col gap-[20px] text-md text-semiBoldGray font-bold`}
    >
      <div className='mx-8 py-4 border-b-2 border-semiBoldGray flex flex-col gap-[32px]'>
        {user.user.id ? (
          <>
            <div className='flex items-center gap-[20px]'>
              <img
                className='w-[36px] h-[36px] rounded-full'
                src={user.user.image}
                alt={user.user.name}
              />
              <p>{user.user.name}</p>
            </div>
            <div className='flex flex-col gap-[20px]'>
              <Link
                to='/'
                className='flex items-center gap-[15px]'
                onClick={redirect}
              >
                <FaBell className='text-base' />
                <span>Notifications</span>
              </Link>
              <Link
                to='/'
                className='flex items-center gap-[15px]'
                onClick={redirect}
              >
                <FaHeart className='text-base' />
                <span>Favorites</span>
              </Link>
              <Link
                to='/cart'
                className='flex items-center gap-[15px]'
                onClick={redirect}
              >
                <FaCartShopping className='text-base' />
                <span>Cart</span>
              </Link>
              <Link
                to='/purchase?page=1'
                className='flex items-center gap-[15px]'
                onClick={redirect}
              >
                <FaClipboard className='text-base' />
                <span>My Purchase</span>
              </Link>
              <Link
                to='/settings'
                className='flex items-center gap-[15px]'
                onClick={redirect}
              >
                <FaGear className='text-base' />
                <span>Settings</span>
              </Link>
            </div>
          </>
        ) : (
          <button
            className='mt-16 flex items-center gap-[20px]'
            onClick={handleLogin}
          >
            <FaRightToBracket className='text-base' />
            <p>Login</p>
          </button>
        )}
      </div>
      <ul className='m-8 pb-4 h-max flex flex-col gap-[24px] border-b-2 border-semiBoldGray'>
        {route}
      </ul>
      {user.user.id && (
        <button
          className='mx-8 mb-4 flex items-center gap-[20px]'
          onClick={handleLogout}
        >
          <FaArrowRightFromBracket />
          <p>Logout</p>
        </button>
      )}
    </section>
  );
};

export default Route;
