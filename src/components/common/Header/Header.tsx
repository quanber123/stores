import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getQuickViewProduct } from '@/services/redux/slice/productSlice';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import LoadingV2 from '../Loading/LoadingV2';
import './Header.css';
import { GlobalModalContext } from '@/components/modal/global/hooks/globalContext';
const ViewProductModal = lazy(
  () =>
    import(
      '@/components/modal/specific/modal/view-product-modal/ViewProductModal'
    )
);
const AlertModal = lazy(
  () => import('@/components/modal/global/modal/alert-modal/AlertModal')
);
function Header() {
  const { state, setVisibleModal } = useContext(GlobalModalContext);
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
    if (state.visibleAlertModal?.status) {
      const closeModal = setTimeout(() => {
        setVisibleModal({ visibleAlertModal: {} });
      }, 2000);
      return () => {
        clearTimeout(closeModal);
      };
    }
  }, [state.visibleAlertModal?.status]);
  return (
    <header className='w-full bg-white z-[999] flex justify-center items-center text-sm'>
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleAlertModal?.status ? <AlertModal /> : null}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {quickViewProduct.productModal._id ? <ViewProductModal /> : null}
      </Suspense>
    </header>
  );
}

export default Header;
