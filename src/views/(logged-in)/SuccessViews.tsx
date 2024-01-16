import LazyLoadImage from '@/services/utils/lazyload-image';
import React from 'react';
import successImg from '@/assets/images/successful.png';
import { useNavigate } from 'react-router-dom';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
function SuccessViews() {
  const navigate = useNavigate();
  const layoutRef = useRef(null);

  useLayoutEffect(() => {
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
  }, []);
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
        <h1 className='text-xl font-bold'>Payment success!</h1>
        <p>
          Thank you very much for choosing us. Your support means a lot to us.
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

export default SuccessViews;
