import { useEffect, useState } from 'react';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import './Header.css';
import AlertModal from '@/components/modal/alert/alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVisibleAlertModal,
  setVisibleAlertModal,
} from '@/store/slice/modalSlice';
function Header() {
  const dispatch = useDispatch();
  const visibleAlertModal = useSelector(getVisibleAlertModal);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const closeModal = setTimeout(() => {
      dispatch(setVisibleAlertModal({}));
    }, 2000);
    return () => {
      clearTimeout(closeModal);
    };
  }, [visibleAlertModal]);
  return (
    <header className='fixed w-full bg-white z-[999] flex justify-center items-center text-sm'>
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      <AlertModal />
    </header>
  );
}

export default Header;
