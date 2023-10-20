import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import img1 from '@/assets/images/slide-01.jpg.webp';
import img2 from '@/assets/images/slide-02.jpg.webp';
import img3 from '@/assets/images/slide-03.jpg.webp';
import { FaCaretLeft, FaCaretRight } from '@/assets/icons';
import gsap from 'gsap';
import Button from '@/utils/button';
function BannerHome() {
  const [imgIndex, setImgIndex] = useState<number>(0);
  let imgRef = useRef(null);
  let contentRef = useRef(null);
  let categoryRef = useRef(null);
  let btnRef = useRef(null);
  let btnNext = useRef(null);
  let btnPrev = useRef(null);
  const images = [
    {
      src: img1,
      content: 'Women Collection 2018',
      category: 'New Season',
    },
    {
      src: img2,
      content: 'Men Collection 2018',
      category: 'New Arrivals',
    },
    {
      src: img3,
      content: 'Men New Season',
      category: 'New Arrivals',
    },
  ];
  const handlePrev = () => {
    setImgIndex((prevIndex) => {
      if (prevIndex === 0) return images.length - 1;
      return prevIndex - 1;
    });
  };
  const handleNext = () => {
    setImgIndex((prevIndex) => {
      if (prevIndex === images.length - 1) return 0;
      return prevIndex + 1;
    });
  };
  useEffect(() => {
    const infiniteSlider = setInterval(() => {
      handleNext();
    }, 5000);
    return clearInterval(infiniteSlider);
  }, []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        width: '100%',
        height: '100%',
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        ease: 'elastic',
        duration: 2.5,
      });
      gsap.to(categoryRef.current, {
        x: 0,
        opacity: 1,
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
        left: '20px',
        opacity: 1,
        duration: 0.2,
        ease: 'elastic',
      });
      gsap.to(btnNext.current, {
        right: '20px',
        opacity: 1,
        duration: 0.2,
        ease: 'elastic',
      });
    });
    return () => {
      ctx.revert();
    };
  }, [imgIndex]);
  return (
    <section className='relative w-full h-full aspect-[4/2] flex justify-center overflow-hidden'>
      <div className='w-full h-full flex justify-center items-center overflow-hidden'>
        {images.map((i, index) => {
          return (
            <>
              <img
                ref={imgIndex === index ? imgRef : null}
                style={{ display: imgIndex === index ? 'block' : 'none' }}
                className='img-slider'
                src={i.src}
                alt=''
                key={index}
              />
              <div
                style={{ display: imgIndex === index ? 'flex' : 'none' }}
                className='absolute container img-slider-content'
              >
                <h3
                  style={{ transform: 'translateY(-120px)', opacity: 0 }}
                  ref={imgIndex === index ? contentRef : null}
                  className='text-xl font-medium'
                >
                  {i.content}
                </h3>
                <p
                  style={{ transform: 'translateX(120px)', opacity: 0 }}
                  ref={imgIndex === index ? categoryRef : null}
                  className='text-4xl font-semiBold'
                >
                  {i.category}
                </p>
                <Button
                  style={{ transform: 'translateY(120px)', opacity: 0 }}
                  btnRef={imgIndex === index ? btnRef : null}
                  className='w-[162px] h-[46px] font-medium text-white bg-purple hover:bg-darkGray rounded-[23px]'
                >
                  Shop Now
                </Button>
              </div>
            </>
          );
        })}
      </div>
      <button
        ref={btnPrev}
        className='btn-slider-prev text-gray hover:text-purple'
        style={{ transition: '0.3s all ease' }}
        onClick={handlePrev}
      >
        <FaCaretLeft className='w-[40px] h-[40px]' />
      </button>
      <button
        ref={btnNext}
        className='btn-slider-next text-gray hover:text-purple'
        style={{ transition: '0.3s all ease' }}
        onClick={handleNext}
      >
        <FaCaretRight className='w-[40px] h-[40px]' />
      </button>
    </section>
  );
}

export default BannerHome;
