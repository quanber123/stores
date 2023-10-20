import { useState, useRef, useLayoutEffect } from 'react';
import demoimg from '@/assets/images/banner-01.jpg.webp';
import gsap from 'gsap';
function CategoryHome() {
  const [hoverCategory, setHoverCategory] = useState<number | null>(null);
  const categoryRef = useRef<Array<HTMLElement | null>>([]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      categoryRef.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            y: '180px',
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: index * 0.3,
          }
        );
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <section className='container relative w-full h-full flex justify-between gap-[20px]'>
      <div
        ref={(el) => (categoryRef.current[0] = el)}
        className='max-h-[270px]cursor-pointer'
        onMouseEnter={() => setHoverCategory(1)}
        onMouseLeave={() => setHoverCategory(null)}
      >
        <div className='relative flex'>
          <img
            className='w-full h-full border border-lightGray'
            src={demoimg}
            alt=''
          />
          <div className='absolute top-0 left-0 z-40 px-[34px] py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-xl transition-colors ${
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
            className={`overlay absolute top-0 left-0 px-[34px] py-[38px] w-full h-full z-10 flex items-end  ${
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
          <div className='absolute top-0 left-0 z-40 px-[34px] py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-xl transition-colors ${
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
            className={`overlay absolute top-0 left-0 px-[34px] py-[38px] w-full h-full z-10 flex items-end  ${
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
          <div className='absolute top-0 left-0 z-40 px-[34px] py-[38px] w-full h-full'>
            <h4
              className={`font-bold text-xl transition-colors ${
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
            className={`overlay absolute top-0 left-0 px-[34px] py-[38px] w-full h-full z-10 flex items-end  ${
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
