import { useState, useRef, useLayoutEffect } from 'react';
import demoimg from '@/assets/images/banner-01.jpg.webp';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
function CategoryHome() {
  const [hoverCategory, setHoverCategory] = useState<number | null>(null);
  const categoryRef = useRef<Array<HTMLElement | null>>([]);
  const { isVisible, containerRef } = useObserver();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      categoryRef.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            x: -200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: (3 - index) * 0.3,
          }
        );
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
      } container relative w-full h-full flex flex-col laptop:flex-row justify-between gap-[20px]`}
    >
      <div
        ref={(el) => (categoryRef.current[0] = el)}
        className='max-h-[270px] cursor-pointer'
        onMouseEnter={() => setHoverCategory(1)}
        onMouseLeave={() => setHoverCategory(null)}
      >
        <div className='relative flex'>
          <img
            className='w-full h-full border border-lightGray'
            src={demoimg}
            alt=''
          />
          <div className='absolute top-0 left-0 z-40 px-[17px] tablet:px-[34px] py-[19px] tablet:py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-md tablet:text-xl transition-colors ${
                hoverCategory === 1 ? 'text-white' : 'text-semiBoldGray'
              }`}
            >
              Women
            </h4>
            <p
              className={`transition-colors ${
                hoverCategory === 1 ? 'text-white' : 'text-mediumGray'
              }`}
            >
              Spring 2018
            </p>
          </div>
          <div
            className={`overlay absolute top-0 left-0 tablet:px-[34px] px-[17px] tablet:py-[38px] py-[19px] w-full h-full z-10 flex items-end  ${
              hoverCategory === 1 ? 'bg-overlayPurple opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`font-bold text-white btn-category ${
                hoverCategory === 1 ? 'active' : ''
              }`}
            >
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={(el) => (categoryRef.current[1] = el)}
        className='max-h-[270px] cursor-pointer'
        onMouseEnter={() => setHoverCategory(2)}
        onMouseLeave={() => setHoverCategory(null)}
      >
        <div className='relative flex'>
          <img
            className='w-full h-full border border-lightGray'
            src={demoimg}
            alt=''
          />
          <div className='absolute top-0 left-0 z-40 px-[17px] tablet:px-[34px] py-[19px] tablet:py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-md tablet:text-xl transition-colors ${
                hoverCategory === 2 ? 'text-white' : 'text-semiBoldGray'
              }`}
            >
              Women
            </h4>
            <p
              className={`transition-colors ${
                hoverCategory === 2 ? 'text-white' : 'text-mediumGray'
              }`}
            >
              Spring 2018
            </p>
          </div>
          <div
            className={`overlay absolute top-0 left-0 tablet:px-[34px] px-[17px] tablet:py-[38px] py-[19px] w-full h-full z-10 flex items-end  ${
              hoverCategory === 2 ? 'bg-overlayPurple opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`font-bold text-white btn-category ${
                hoverCategory === 2 ? 'active' : ''
              }`}
            >
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={(el) => (categoryRef.current[2] = el)}
        className='max-h-[270px] cursor-pointer'
        onMouseEnter={() => setHoverCategory(3)}
        onMouseLeave={() => setHoverCategory(null)}
      >
        <div className='relative flex'>
          <img
            className='w-full h-full border border-lightGray'
            src={demoimg}
            alt=''
          />
          <div className='absolute top-0 left-0 z-40 px-[17px] tablet:px-[34px] py-[19px] tablet:py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-md tablet:text-xl transition-colors ${
                hoverCategory === 3 ? 'text-white' : 'text-semiBoldGray'
              }`}
            >
              Women
            </h4>
            <p
              className={`transition-colors ${
                hoverCategory === 3 ? 'text-white' : 'text-mediumGray'
              }`}
            >
              Spring 2018
            </p>
          </div>
          <div
            className={`overlay absolute top-0 left-0 tablet:px-[34px] px-[17px] tablet:py-[38px] py-[19px] w-full h-full z-10 flex items-end  ${
              hoverCategory === 3 ? 'bg-overlayPurple opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`font-bold text-white btn-category ${
                hoverCategory === 3 ? 'active' : ''
              }`}
            >
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryHome;
