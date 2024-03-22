import LazyLoadImage from '@/services/utils/lazyload-image';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import cancelImg from '@/assets/images/cancel.png';
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/productFeatures';
import { useAuth } from '@/hooks/useAuth';
function CancelViews() {
  const user = useAuth();
  const navigate = useNavigate();
  const layoutRef = useRef(null);
  const [searchQuery] = useSearchParams();
  const code = searchQuery.get('orderCode');
  const status = searchQuery.get('status');
  const { data: dataOrder, isSuccess: isSuccessOrder } = useGetOrderByIdQuery(
    {
      id: code,
    },
    { skip: !code }
  );
  const [updateOrder] = useUpdateOrderMutation();
  useLayoutEffect(() => {
    if (!code && !status) {
      navigate('/not-found', { replace: true });
    }
    if (layoutRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          layoutRef.current,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
          }
        );
      });
      return () => {
        ctx.revert();
      };
    }
  }, [navigate]);
  useEffect(() => {
    if (isSuccessOrder && dataOrder.status === 'CANCELLED') {
      updateOrder({
        orderId: code,
        status: dataOrder.status,
        userId: user.id,
      });
    }
  }, [isSuccessOrder, dataOrder]);
  return (
    <main className='bg-lightGray justify-center items-center text-darkGray'>
      <div
        ref={layoutRef}
        className='w-1/2 py-16 rounded-[4px] bg-white flex flex-col justify-center items-center gap-[20px]'
      >
        <div className='w-[180px] h-[180px]'>
          <LazyLoadImage
            className='w-[180px] h-[180px]'
            src={cancelImg}
            alt='cancel-img'
          />
        </div>
        <h1 className='text-xl font-bold'>Payment canceled !</h1>
        <p>
          We are sorry for the inconvenience this may cause and hope that you
          will find suitable products in the future.
        </p>
        <button
          className='bg-darkGray hover:bg-purple text-white px-8 py-3 text-md rounded-[4px]'
          onClick={() => navigate('/', { replace: true })}
        >
          Go To Home
        </button>
      </div>
    </main>
  );
}

export default CancelViews;
