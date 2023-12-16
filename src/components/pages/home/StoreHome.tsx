import { useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import scrollElement from '@/utils/scroll-elements';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllProductsOverview } from '@/store/slice/productSlice';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
function StoreHome() {
  const products = useSelector(getAllProductsOverview);
  // const [queryParams, setQueryParams] = useSearchParams();
  // const queryProduct = queryParams.get('product') ?? '';
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

  const handleLinkClick = () => {
    scrollElement();
    navigate('/shop');
  };
  // const handleQueryChange = useCallback((e: React.MouseEvent<HTMLElement>) => {
  //   const name = e.currentTarget.getAttribute('data-name') || '';
  //   const value = e.currentTarget.getAttribute('value') || '';
  //   setQueryParams((prevQuery) => {
  //     const newQuery = new URLSearchParams(prevQuery);
  //     if (value.trim() !== '') {
  //       newQuery.set(name, value);
  //     } else {
  //       newQuery.delete(name);
  //     }
  //     return newQuery.toString();
  //   });
  // }, []);
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
      {/* <div>
        <ul className='text-sm tablet:text-base flex justify-center gap-[20px] tablet:gap-[40px] font-bold'>
          {['Best Seller', 'Featured', 'Top Rate'].map((text, index) => {
            return (
              <li key={index} ref={(el) => (routeRefs.current[index] = el)}>
                <button
                  className={`text-semiBoldGray hover:text-purple ${
                    queryProduct === text.toLowerCase() ? 'text-purple' : ''
                  }`}
                  data-name='product'
                  value={text.toLowerCase()}
                  onClick={handleQueryChange}
                >
                  {text}
                </button>
              </li>
            );
          })}
        </ul>
      </div> */}
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
