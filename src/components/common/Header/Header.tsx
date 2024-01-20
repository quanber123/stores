import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import LoadingV2 from '../Loading/LoadingV2';
import './Header.css';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import ConfirmModal from '@/components/modal/modal/confirm-modal/ConfirmModal';
const ProductModal = lazy(
  () => import('@/components/modal/modal/product-modal/ProductModal')
);
const AlertModal = lazy(
  () => import('@/components/modal/modal/alert-modal/AlertModal')
);
const AddressModal = lazy(
  () => import('@/components/modal/modal/address-modal/AddressModal')
);
const AddAddressModal = lazy(
  () => import('@/components/modal/modal/address-modal/AddAddress')
);
const UpdateAddressModal = lazy(
  () => import('@/components/modal/modal/address-modal/UpdateAddress')
);
function Header() {
  const { state, setVisibleModal } = useContext(ModalContext);
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
        {state.visibleAlertModal?.status && <AlertModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleProductModal?._id && <ProductModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleConfirmModal?.message && <ConfirmModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleAddressModal && <AddressModal />}
        {state.visibleAddAddressModal && <AddAddressModal />}
        {state.visibleUpdateAddressModal && <UpdateAddressModal />}
      </Suspense>
    </header>
  );
}

export default Header;
