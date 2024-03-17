import { useRef, useLayoutEffect, useMemo } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useSlider } from '@/hooks/useSlider';
import { useGetBannersQuery } from '@/services/redux/features/productFeatures';
import { Banner } from '@/interfaces/interfaces';
function BannerHome() {
  const navigate = useNavigate();
  let contentRef = useRef(null);
  let categoryRef = useRef(null);
  let btnRef = useRef(null);
  let btnNext = useRef(null);
  let btnPrev = useRef(null);
  const { data: dataBanners, isSuccess: isSuccessBanners } = useGetBannersQuery(
    null,
    { pollingInterval: import.meta.env.VITE_DEFAULT_POLLING * 1000 }
  );

  const { indexImage, handlePrev, handleNext } = useSlider(
    isSuccessBanners && dataBanners?.length
  );
  useLayoutEffect(() => {
    if (
      contentRef.current === null ||
      categoryRef.current === null ||
      btnRef.current === null ||
      btnPrev.current === null ||
      btnNext.current === null
    ) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: -120,
        opacity: 0,
        ease: 'elastic',
        duration: 2.5,
      });
      gsap.from(categoryRef.current, {
        x: 120,
        opacity: 0,
        delay: 0.2,
        ease: 'elastic',
        duration: 2.5,
      });
      gsap.to(btnRef.current, {
        y: 0,
        opacity: 1,
        delay: 0.4,
        ease: 'elastic',
        duration: 0.1,
      });
      gsap.to(btnPrev.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
      gsap.to(btnNext.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
    });
    return () => {
      ctx.revert();
    };
  }, [indexImage, isSuccessBanners]);
  const renderedBanners = useMemo(() => {
    return (
      isSuccessBanners &&
      dataBanners?.map((b: Banner, index: number) => {
        return (
          <article
            key={index}
            className='absolute w-full h-full desktop:h-[100vh] flex justify-center items-center overflow-hidden'
          >
            <img
              className='absolute w-full h-full'
              style={{
                transform:
                  indexImage === index ? `translateX(0)` : `translateX(100%)`,
                transition: 'all 0.3s linear',
              }}
              src={b.image}
              srcSet={`${b.imageMobile} 300w, ${b.imageTablet} 768w, ${b.imageLaptop} 1000w`}
              sizes='(max-width: 400) 400px, (max-width: 768px) 768px, (max-width: 1000) 1000px'
              alt={b.content}
              {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
                React.ImgHTMLAttributes<HTMLImageElement>,
                HTMLImageElement
              >)}
            />
            <div
              className={`container absolute z-20 ${
                indexImage === index ? 'flex' : 'hidden'
              } flex-col tablet:justify-start justify-center tablet:items-start items-center gap-[20px]`}
            >
              <p
                ref={indexImage === index ? contentRef : null}
                className='text-md laptop:text-xl font-medium capitalize'
              >
                {b.content}
              </p>
              <p
                ref={indexImage === index ? categoryRef : null}
                className='text-2xl laptop:text-4xl font-semiBold capitalize'
              >
                {b.sub_content}
              </p>
              <button
                style={{ transform: 'translateY(120px)', opacity: 0 }}
                ref={indexImage === index ? btnRef : null}
                className='w-[128px] tablet:w-[162px] h-[36px] tablet:h-[46px] font-medium text-white bg-darkGray hover:bg-purple rounded-[23px]'
                onClick={() =>
                  navigate(`shop?category=${b.category.name}`, {
                    replace: true,
                  })
                }
              >
                Shop Now
              </button>
            </div>
          </article>
        );
      })
    );
  }, [dataBanners, indexImage, isSuccessBanners]);
  return (
    <div
      className={`relative w-[100vw] h-[50vh] tablet:h-[80vh] desktop:h-[100vh] overflow-hidden`}
    >
      {renderedBanners}
      <button
        ref={btnPrev}
        className='absolute top-1/2 left-[5%] z-50 text-semiBoldGray hover:text-purple'
        style={{ opacity: 0, scale: 0 }}
        onClick={handlePrev}
        aria-label='Previous'
      >
        <FaCaretLeft className='w-[40px] h-[40px]' />
      </button>
      <button
        ref={btnNext}
        className='absolute top-1/2 right-[5%] z-50 text-semiBoldGray hover:text-purple'
        style={{ opacity: 0, scale: 0 }}
        onClick={handleNext}
        aria-label='Next'
      >
        <FaCaretRight className='w-[40px] h-[40px]' />
      </button>
    </div>
  );
}

export default BannerHome;
