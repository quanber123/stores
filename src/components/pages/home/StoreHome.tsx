import { useRef, useLayoutEffect, RefObject } from 'react';
import demoimg from '@/assets/images/product-12.jpg.webp';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewProduct from '@/components/single-product/PreviewProduct';
import Carousel from '@/utils/carousel';
import { FaAngleLeft, FaAngleRight } from '@/assets/icons/index';
function StoreHome() {
  const titleRef = useRef(null);
  const productRefs = useRef<Array<RefObject<HTMLElement> | null>>([]);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  const { isVisible, containerRef } = useObserver();

  const products = [
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      name: 'Esprit Ruffle Shirt',
      price: 34.75,
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
  ];
  const { width, indexSlider, breakpoints, handlePrev, handleNext } = Carousel(
    products.length
  );
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      productRefs.current.forEach((ref, index) => {
        if (ref) {
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
        }
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
      } relative w-full h-full flex flex-col items-center justify-center gap-[20px] overflow-hidden`}
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
      <div className='container relative mt-4'>
        <div
          className={`m-auto max-w-[${width * breakpoints}%] overflow-hidden`}
        >
          <div
            className='w-full flex justify-between gap-[20px]'
            style={{
              transform: `translateX(-${indexSlider * width}%)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {products.map((p, index) => (
              <PreviewProduct
                style={{ width: `${width}%` }}
                key={index}
                srcImg={p.srcImg}
                altImg={p.name}
                refEl={(el: any) => {
                  productRefs.current[index] = el;
                }}
                nameProduct='Esprit Ruffle Shirt'
                priceProduct={p.price}
              />
            ))}
          </div>
        </div>
        <div className='text-xl'>
          <FaAngleLeft
            className='absolute z-50 top-1/2 -left-[4%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
            onClick={handlePrev}
          />
          <FaAngleRight
            className='absolute z-50 top-1/2 -right-[1%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
            onClick={handleNext}
          />
        </div>
      </div>
    </section>
  );
}

export default StoreHome;
