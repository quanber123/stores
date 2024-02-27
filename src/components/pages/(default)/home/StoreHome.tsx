import { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { useObserver } from '@/hooks/useObserver';
import PreviewProduct from '@/components/(ui)/product/PreviewProduct';
import scrollElement from '@/services/utils/scroll-elements';
import { useNavigate } from 'react-router-dom';
import {
  getAllProductsOverview,
  setAllProductsOverview,
} from '@/services/redux/slice/productSlice';
import { useGetProductsQuery } from '@/services/redux/features/productFeatures';
function StoreHome() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsOverview);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const productRefs = useRef<Array<HTMLElement | null>>([]);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  const btnRef = useRef(null);
  const { isVisible, containerRef } = useObserver();
  const { data: dataProducts, isSuccess: isSuccessProducts } =
    useGetProductsQuery({ search: 'page=1' });
  const renderedProduct = useMemo(() => {
    return products.map((p, index) => (
      <PreviewProduct
        key={index}
        product={p}
        refEl={(el) => (productRefs.current[index] = el)}
      />
    ));
  }, [products]);

  const handleLinkClick = () => {
    scrollElement();
    navigate('/shop');
  };
  useEffect(() => {
    if (isSuccessProducts && dataProducts) {
      dispatch(setAllProductsOverview(dataProducts));
    }
  }, [isSuccessProducts]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      productRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.3,
          }
        );
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: 0,
          opacity: 1,
          ease: 'elastic',
          duration: 2.5,
        });
      }

      routeRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              x: -200,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              delay: (routeRefs.current.length - 1 - index) * 0.3,
            }
          );
        }
      });
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          x: 0,
          opacity: 1,
          delay: 1.5,
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isVisible]);
  return (
    <div
      ref={containerRef}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } w-full h-full flex flex-col items-center justify-center gap-[20px] overflow-hidden`}
    >
      <h2
        ref={titleRef}
        className='text-xl tablet:text-4xl text-darkGray font-bold'
        style={{ transform: 'translateX(120px)', opacity: 0 }}
      >
        Store Overview
      </h2>
      <div className='container mt-4 grid laptop:grid-cols-2 desktop:grid-cols-4 gap-[40px]'>
        {renderedProduct}
      </div>
      <button
        ref={btnRef}
        className='px-6 py-2 bg-semiBoldGray hover:bg-purple text-white text-md rounded-[23px]'
        onClick={handleLinkClick}
      >
        Load More
      </button>
    </div>
  );
}

export default StoreHome;
