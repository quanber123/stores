import { useRef, useLayoutEffect, RefObject } from 'react';
import demoimg from '@/assets/images/product-12.jpg.webp';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewProduct from '@/components/single-product/PreviewProduct';

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
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      productRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: '180px', opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 2,
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
              x: '-180px',
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 2,
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
        className='text-4xl text-darkGray font-bold'
        style={{ transform: 'translateX(120px)', opacity: 0 }}
      >
        Store Overview
      </h2>
      <div>
        <ul className='flex justify-center gap-[40px] text-gray font-bold'>
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
      <div className='mt-4 flex justify-center items-stretch gap-[20px]'>
        {products.map((p, index) => (
          <PreviewProduct
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
    </section>
  );
}

export default StoreHome;
