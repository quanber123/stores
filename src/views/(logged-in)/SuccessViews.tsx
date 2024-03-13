import LazyLoadImage from '@/services/utils/lazyload-image';
import { useEffect } from 'react';
import successImg from '@/assets/images/successful.png';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/productFeatures';
import { useAuth } from '@/hooks/useAuth';
function SuccessViews() {
  const navigate = useNavigate();
  const user = useAuth();
  const token = window.localStorage.getItem('coza-store-token');
  const layoutRef = useRef(null);
  const [searchQuery] = useSearchParams();
  const code = searchQuery.get('orderCode');
  const paymentMethod = searchQuery.get('paymentMethod');
  const { data: dataOrder, isSuccess: isSuccessOrder } = useGetOrderByIdQuery(
    {
      token,
      id: code,
      paymentMethod: paymentMethod,
    },
    { skip: !code && !paymentMethod }
  );
  const [updateOrder] = useUpdateOrderMutation();
  useLayoutEffect(() => {
    if (!code) {
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
    if (isSuccessOrder && dataOrder.data.status === 'PAID') {
      updateOrder({ orderId: code, status: 'DELIVERING', userId: user.id });
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
            src={successImg}
            alt='success-img'
          />
        </div>
        {paymentMethod === 'transfer' && (
          <h1 className='text-xl font-bold'>Payment success!</h1>
        )}
        {paymentMethod === 'transfer' && (
          <p>
            Thank you very much for choosing us. Your support means a lot to us.
          </p>
        )}
        {paymentMethod === 'cash' && (
          <h1 className='text-xl font-bold'>Order success!</h1>
        )}
        {paymentMethod === 'cash' && (
          <p>
            Thank you for ordering from us. We will deliver the goods as soon as
            possible.
          </p>
        )}
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

export default SuccessViews;
