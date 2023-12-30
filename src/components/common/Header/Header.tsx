import { useEffect, useState } from 'react';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import AlertModal from '@/components/modal/alert-modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVisibleAlertModal,
  setVisibleAlertModal,
} from '@/store/slice/modalSlice';
import './Header.css';
import ViewProductModal from '@/components/modal/view-product-modal/ViewProductModal';
import { getQuickViewProduct } from '@/store/slice/productSlice';
function Header() {
  const dispatch = useDispatch();
  const visibleAlertModal = useSelector(getVisibleAlertModal);
  const quickViewProduct = useSelector(getQuickViewProduct);
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
    if (visibleAlertModal?.status) {
      const closeModal = setTimeout(() => {
        dispatch(setVisibleAlertModal({}));
      }, 2000);
      return () => {
        clearTimeout(closeModal);
      };
    }
  }, [dispatch, visibleAlertModal?.status]);
  return (
    <header className='w-full bg-white z-[999] flex justify-center items-center text-sm'>
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      {visibleAlertModal?.status ? <AlertModal /> : <></>}
      {quickViewProduct.productModal._id ? <ViewProductModal /> : <></>}
    </header>
  );
}

export default Header;
