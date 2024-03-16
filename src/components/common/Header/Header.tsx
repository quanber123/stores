import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import LoadingV2 from '../Loading/LoadingV2';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useAuth } from '@/hooks/useAuth';
const DesktopNavBar = lazy(() => import('./desktop'));
const MobileNavBar = lazy(() => import('./mobile'));
const ConfirmModal = lazy(
  () =>
    import('@/components/modal/modal/(logged-in)/confirm-modal/ConfirmModal')
);
const AlertModal = lazy(
  () => import('@/components/modal/modal/(default)/alert-modal/AlertModal')
);
const AddressModal = lazy(
  () =>
    import('@/components/modal/modal/(logged-in)/address-modal/AddressModal')
);
const AddAddressModal = lazy(
  () => import('@/components/modal/modal/(logged-in)/address-modal/AddAddress')
);
const UpdateAddressModal = lazy(
  () =>
    import('@/components/modal/modal/(logged-in)/address-modal/UpdateAddress')
);
const ReviewsModal = lazy(
  () =>
    import('@/components/modal/modal/(logged-in)/reviews-modal/ReviewsModal')
);
const LoginModal = lazy(
  () => import('@/components/modal/modal/(default)/login-modal/LoginModal')
);
const RegisterModal = lazy(
  () =>
    import('@/components/modal/modal/(default)/register-modal/RegisterModal')
);
function Header() {
  const { state, setVisibleModal } = useContext(ModalContext);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);
  const user = useAuth();
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
    <header
      style={{ boxShadow: '0 0px 3px 0px rgba(0, 0, 0, 0.2)' }}
      className='fixed w-full bg-white z-[999] flex justify-center items-center text-sm'
    >
      <Suspense>{isDesktop ? <DesktopNavBar /> : <MobileNavBar />}</Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleAlertModal?.status && <AlertModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleConfirmModal?.message && <ConfirmModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleAddressModal && <AddressModal />}
        {state.visibleAddAddressModal && <AddAddressModal />}
        {state.visibleUpdateAddressModal && <UpdateAddressModal />}
      </Suspense>
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleReviewsModal && <ReviewsModal />}
      </Suspense>
      {user === null && (
        <Suspense>
          <LoginModal />
          <RegisterModal />
        </Suspense>
      )}
    </header>
  );
}

export default Header;
