import { useRef, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import scrollElement from '@/utils/scroll-elements';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '@/store/slice/productSlice';
function StoreHome() {
  const products = useSelector(getAllProducts);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const productRefs = useRef<Array<HTMLElement | null>>([]);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  const btnRef = useRef(null);
  const { isVisible, containerRef } = useObserver();
  const renderedProduct = useMemo(() => {
    return products.map((p, index) => (
      <PreviewProduct
        key={index}
        product={p}
        refEl={(el) => (productRefs.current[index] = el)}
      />
    ));
  }, [products]);
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
  const handleLinkClick = () => {
    scrollElement();
    navigate('/shop', { replace: true });
  };
  return (
    <section
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
      <div>
        <ul className='text-sm tablet:text-base flex justify-center gap-[20px] tablet:gap-[40px] text-gray font-bold'>
          {['Best', 'Seller', 'Featured', 'Top Rate'].map((text, index) => (
            <li
              key={index}
              ref={(el) => (routeRefs.current[index] = el)}
              className='hover:text-semiBoldGray transition-colors cursor-pointer'
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className='container product-list mt-4'>{renderedProduct}</div>
      <button
        ref={btnRef}
        className='px-6 py-2 bg-semiBoldGray hover:bg-purple text-white text-md rounded-[23px]'
        onClick={handleLinkClick}
      >
        Load More
      </button>
    </section>
  );
}

export default StoreHome;
