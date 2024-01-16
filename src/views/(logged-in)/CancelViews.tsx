import LazyLoadImage from '@/services/utils/lazyload-image';
import { useEffect } from 'react';
import cancelImg from '@/assets/images/cancel.png';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { accessToken } from '@/services/redux/slice/authSlice';
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '@/services/redux/features/productFeatures';
function CancelViews() {
  const navigate = useNavigate();
  const token = useSelector(accessToken);
  const layoutRef = useRef(null);
  const [searchQuery] = useSearchParams();
  const code = searchQuery.get('orderCode');
  const { data: dataOrder, isSuccess: isSuccessOrder } = useGetOrderByIdQuery(
    {
      token,
      id: code,
    },
    { skip: !code }
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
    if (isSuccessOrder) {
      dataOrder.data.status === 'CANCELED' &&
        updateOrder({ token: token, id: code, status: dataOrder.data.status });
    }
  }, [isSuccessOrder, updateOrder]);
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
