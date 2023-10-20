import { useState, useRef, useLayoutEffect } from 'react';
import demoimg from '@/assets/images/product-12.jpg.webp';
import { FaRegHeart } from '@/assets/icons/index';
import gsap from 'gsap';
function StoreHome() {
  const [hoverProduct, setHoverProduct] = useState<number | null>();
  const productRef = useRef<Array<HTMLElement | null>>([]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      productRef.current?.forEach((ref, index) => {
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
    <section className='relative w-full h-full flex flex-col items-center justify-center gap-[20px] overflow-hidden'>
      <h2 className='text-4xl text-darkGray font-bold'>Store Overview</h2>
      <div>
        <ul className='flex justify-center gap-[40px] text-gray font-bold'>
          <li className='hover:text-semiBoldGray transition-colors cursor-pointer'>
            Best
          </li>
          <li className='hover:text-semiBoldGray transition-colors cursor-pointer'>
            Seller
          </li>
          <li className='hover:text-semiBoldGray transition-colors cursor-pointer'>
            Featured
          </li>
          <li className='hover:text-semiBoldGray transition-colors cursor-pointer'>
            Top Rate
          </li>
        </ul>
      </div>
      <div className='mt-4 flex justify-center items-stretch gap-[20px]'>
        <div
          ref={(el) => (productRef.current[0] = el)}
          className='relative max-w-[315px]  flex flex-col gap-[15px]'
        >
          <div
            className='product-preview relative overflow-hidden cursor-pointer'
            onMouseEnter={() => setHoverProduct(1)}
            onMouseLeave={() => setHoverProduct(null)}
          >
            <img className='max-h-[390px]' src={demoimg} alt='' />
            <div
              style={{
                transform:
                  hoverProduct === 1 ? 'translateY(0)' : 'translateY(60px)',
                opacity: hoverProduct === 1 ? '1' : '0',
                transition: 'all 0.2s linear',
              }}
            >
              <button
                className='absolute z-10 px-4 py-2 bg-white text-darkGray hover:bg-[#000] hover:text-white'
                style={{
                  bottom: '16px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '23px',
                  transition: 'all 0.3s linear',
                }}
              >
                Quick View
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <div className='flex justify-between items-center text-gray font-medium'>
              <h5 className='cursor-pointer'>Esprit Ruffle Shirt</h5>
              <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
            </div>
            <p>$34.75</p>
          </div>
        </div>
        <div
          ref={(el) => (productRef.current[1] = el)}
          className='relative max-w-[315px]  flex flex-col gap-[15px]'
        >
          <div
            className='product-preview relative overflow-hidden cursor-pointer'
            onMouseEnter={() => setHoverProduct(2)}
            onMouseLeave={() => setHoverProduct(null)}
          >
            <img className='max-h-[390px]' src={demoimg} alt='' />
            <div
              style={{
                transform:
                  hoverProduct === 2 ? 'translateY(0)' : 'translateY(60px)',
                opacity: hoverProduct === 2 ? '1' : '0',
                transition: 'all 0.2s linear',
              }}
            >
              <button
                className='absolute z-10 px-4 py-2 bg-white text-darkGray hover:bg-[#000] hover:text-white'
                style={{
                  bottom: '16px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '23px',
                  transition: 'all 0.3s linear',
                }}
              >
                Quick View
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <div className='flex justify-between items-center text-gray font-medium'>
              <h5 className='cursor-pointer'>Esprit Ruffle Shirt</h5>
              <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
            </div>
            <p>$34.75</p>
          </div>
        </div>
        <div
          ref={(el) => (productRef.current[2] = el)}
          className='relative max-w-[315px]  flex flex-col gap-[15px]'
        >
          <div
            className='product-preview relative overflow-hidden cursor-pointer'
            onMouseEnter={() => setHoverProduct(3)}
            onMouseLeave={() => setHoverProduct(null)}
          >
            <img className='max-h-[390px]' src={demoimg} alt='' />
            <div
              style={{
                transform:
                  hoverProduct === 3 ? 'translateY(0)' : 'translateY(60px)',
                opacity: hoverProduct === 3 ? '1' : '0',
                transition: 'all 0.2s linear',
              }}
            >
              <button
                className='absolute z-10 px-4 py-2 bg-white text-darkGray hover:bg-[#000] hover:text-white'
                style={{
                  bottom: '16px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '23px',
                  transition: 'all 0.3s linear',
                }}
              >
                Quick View
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <div className='flex justify-between items-center text-gray font-medium'>
              <h5 className='cursor-pointer'>Esprit Ruffle Shirt</h5>
              <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
            </div>
            <p>$34.75</p>
          </div>
        </div>
        <div
          ref={(el) => (productRef.current[3] = el)}
          className='relative max-w-[315px]  flex flex-col gap-[15px]'
        >
          <div
            className='product-preview relative overflow-hidden cursor-pointer'
            onMouseEnter={() => setHoverProduct(4)}
            onMouseLeave={() => setHoverProduct(null)}
          >
            <img className='max-h-[390px]' src={demoimg} alt='' />
            <div
              style={{
                transform:
                  hoverProduct === 4 ? 'translateY(0)' : 'translateY(60px)',
                opacity: hoverProduct === 4 ? '1' : '0',
                transition: 'all 0.2s linear',
              }}
            >
              <button
                className='absolute z-10 px-4 py-2 bg-white text-darkGray hover:bg-[#000] hover:text-white'
                style={{
                  bottom: '16px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '23px',
                  transition: 'all 0.3s linear',
                }}
              >
                Quick View
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <div className='flex justify-between items-center text-gray font-medium'>
              <h5 className='cursor-pointer'>Esprit Ruffle Shirt</h5>
              <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
            </div>
            <p>$34.75</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreHome;
