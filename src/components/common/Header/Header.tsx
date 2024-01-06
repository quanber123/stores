import { Suspense, lazy, useEffect, useState } from 'react';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVisibleAlertModal,
  setVisibleAlertModal,
} from '@/store/slice/modalSlice';
import './Header.css';
import { getQuickViewProduct } from '@/store/slice/productSlice';
import LoadingV2 from '../Loading/LoadingV2';
const ViewProductModal = lazy(
  () => import('@/components/modal/view-product-modal/ViewProductModal')
);
const AlertModal = lazy(
  () => import('@/components/modal/alert-modal/AlertModal')
);
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
  }, [visibleAlertModal?.status]);
  return (
    <header className='w-full bg-white z-[999] flex justify-center items-center text-sm'>
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      <Suspense fallback={<LoadingV2 />}>
        {visibleAlertModal?.status ? <AlertModal /> : null}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {quickViewProduct.productModal._id ? <ViewProductModal /> : null}
      </Suspense>
    </header>
  );
}

export default Header;
