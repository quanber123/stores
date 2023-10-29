import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewProduct from '@/components/single-product/PreviewProduct';
import demoimg from '@/assets/images/product-12.jpg.webp';
import { FaArrowDownWideShort } from '@/assets/icons/index';
function Shop() {
  const { isVisible, containerRef } = useObserver();
  const productRefs = useRef<Array<HTMLElement | null>>([]);
  const subRouteRefs = useRef<Array<HTMLElement | null>>([]);
  const btnRef = useRef(null);
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
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      subRouteRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            x: -200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            // duration: 0.5,
            delay: (3 - index) * 0.3,
          }
        );
      });
      gsap.to(btnRef.current, {
        x: 0,
        opacity: 1,
        // duration: 0.5,
      });
      productRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            x: 200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.3,
          }
        );
      });
    });
    return () => {
      ctx.revert();
    };
  }, [isVisible]);
  const renderedProducts = products.map((p, index) => {
    return (
      <PreviewProduct
        key={index}
        srcImg={p.srcImg}
        altImg={p.name}
        refEl={(el) => (productRefs.current[index] = el)}
        nameProduct='Esprit Ruffle Shirt'
        priceProduct={p.price}
      />
    );
  });
  return (
    <>
      <section>
        <div className='container block laptop:flex justify-between items-center gap-[40px]'>
          <ul className='flex justify-center items-center gap-[20px]'>
            <li
              ref={(el) => (subRouteRefs.current[0] = el)}
              className='sub-routes'
            >
              All Products
            </li>
            <li
              ref={(el) => (subRouteRefs.current[1] = el)}
              className='sub-routes'
            >
              Women
            </li>
            <li
              ref={(el) => (subRouteRefs.current[2] = el)}
              className='sub-routes'
            >
              Men
            </li>
          </ul>
          <button
            ref={btnRef}
            className='mx-auto my-4 laptop:m-0 flex items-center gap-[8px] border-lightGray border px-6 py-2 rounded-[4px] text-darkGray hover:text-white hover:bg-purple'
            style={{ transform: 'translateX(200px)', opacity: 0 }}
          >
            <FaArrowDownWideShort />
            <span>Filter</span>
          </button>
        </div>
      </section>
      <section
        ref={containerRef}
        className={`${
          isVisible ? 'opacity-100' : 'opacity-0'
        } container m-auto flex flex-wrap justify-start items-center gap-[20px]`}
      >
        {renderedProducts}
      </section>
    </>
  );
}

export default Shop;
