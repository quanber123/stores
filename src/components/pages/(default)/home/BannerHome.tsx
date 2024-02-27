import { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useSlider } from '@/hooks/useSlider';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllBanners,
  setAllBanners,
} from '@/services/redux/slice/productSlice';
import { useGetBannersQuery } from '@/services/redux/features/productFeatures';
function BannerHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const banners = useSelector(getAllBanners);
  let imgRef = useRef(null);
  let contentRef = useRef(null);
  let categoryRef = useRef(null);
  let btnRef = useRef(null);
  let btnNext = useRef(null);
  let btnPrev = useRef(null);
  const { indexImage, handlePrev, handleNext } = useSlider(banners.length);
  const { data: dataBanners, isSuccess: isSuccessBanners } =
    useGetBannersQuery(null);

  useEffect(() => {
    if (isSuccessBanners && dataBanners) {
      dispatch(setAllBanners(dataBanners));
    }
  }, [isSuccessBanners]);
  useLayoutEffect(() => {
    if (
      imgRef.current === null ||
      contentRef.current === null ||
      categoryRef.current === null ||
      btnRef.current === null ||
      btnPrev.current === null ||
      btnNext.current === null
    ) {
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        width: '100%',
        height: '100%',
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
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
  }, [indexImage, banners]);
  const renderedBanners = useMemo(() => {
    return banners?.map((i, index) => {
      return (
        <article
          key={index}
          className='absolute w-full h-full flex justify-center items-center overflow-hidden'
        >
          <img
            ref={indexImage === index ? imgRef : null}
            className={`absolute w-[100vw] h-[100vh] aspect-[4/3] ${
              indexImage === index ? 'opacity-100' : 'opacity-0 '
            }`}
            src={i.image}
            alt={i.content}
            // loading='eager'
            {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
              React.ImgHTMLAttributes<HTMLImageElement>,
              HTMLImageElement
            >)}
          />
          <div
            style={{ display: indexImage === index ? 'flex' : 'none' }}
            className='container absolute z-20 flex flex-col tablet:justify-start justify-center tablet:items-start items-center gap-[20px]'
          >
            <h3
              ref={indexImage === index ? contentRef : null}
              className='text-md laptop:text-xl font-medium capitalize'
            >
              {i.content}
            </h3>
            <p
              ref={indexImage === index ? categoryRef : null}
              className='text-2xl laptop:text-4xl font-semiBold capitalize'
            >
              {i.category}
            </p>
            <button
              style={{ transform: 'translateY(120px)', opacity: 0 }}
              ref={indexImage === index ? btnRef : null}
              className='w-[128px] tablet:w-[162px] h-[36px] tablet:h-[46px] font-medium text-white bg-darkGray hover:bg-purple rounded-[23px]'
              onClick={() => navigate('/shop', { replace: true })}
            >
              Shop Now
            </button>
          </div>
        </article>
      );
    });
  }, [banners, indexImage]);
  return (
    <div
      className={`relative w-[100vw] h-[100vh] laptop:aspect-[4/2] flex justify-center overflow-hidden`}
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
