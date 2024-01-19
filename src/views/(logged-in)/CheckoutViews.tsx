import {
  Suspense,
  lazy,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import SetHeader from '@/services/utils/set-header';
import gsap from 'gsap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutList from '@/components/pages/auth/checkout/CheckoutList';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { ModalContext } from '@/components/modal/hooks/modalContext';
const AddressModal = lazy(
  () => import('@/components/modal/modal/address-modal/AddressModal')
);

function CheckoutViews() {
  const { state } = useContext(ModalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const layoutRef = useRef(null);
  const [tempOrders, setTempOrders] = useState([]);
  useLayoutEffect(() => {
    const stateParam = searchQuery.get('state');
    if (stateParam) {
      try {
        const decodedTempOrder = JSON.parse(atob(stateParam));
        setTempOrders(decodedTempOrder);
      } catch (error) {
        navigate('/not-found', { replace: true });
      }
    } else {
      navigate('/not-found', { replace: true });
    }
    if (layoutRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          layoutRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        );
      });
      return () => {
        ctx.revert();
      };
    }
  }, [navigate]);
  return (
    <>
      <SetHeader title={location.pathname} isBlockIndex={true} />
      <Suspense fallback={<LoadingV2 />}>
        {state.visibleAddressModal && <AddressModal />}
      </Suspense>
      <main ref={layoutRef} className='bg-lightGray'>
        <Breadcrumbs breadcrumbs={location.pathname} />
        {tempOrders.length && <CheckoutList orders={tempOrders} />}
      </main>
    </>
  );
}

export default CheckoutViews;
