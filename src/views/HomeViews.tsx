import React, { useEffect, useState } from 'react';
import img1 from '@/assets/images/slide-01.jpg.webp';
import img2 from '@/assets/images/slide-02.jpg.webp';
import img3 from '@/assets/images/slide-03.jpg.webp';
import { FaCaretLeft, FaCaretRight } from '@/assets/icons';
function HomeViews() {
  const [imgIndex, setImgIndex] = useState(0);
  const images = [img1, img2, img3];
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
      handlePrev();
    }, 3000);
    return clearInterval(infiniteSlider);
  }, []);
  return (
    <div className='relative w-full h-full aspect-[4/2]'>
      <div className='w-full h-full flex overflow-hidden'>
        {images.map((i, index) => {
          return (
            <img
              style={{ translate: `${-100 * imgIndex}%` }}
              className='img-slider'
              key={index}
              src={i}
              alt=''
            />
          );
        })}
      </div>
      <button
        className='btn-slider-prev text-gray hover:text-purple'
        style={{ transition: '0.3s all ease' }}
        onClick={handlePrev}
      >
        <FaCaretLeft className='w-[40px] h-[40px]' />
      </button>
      <button
        className='btn-slider-next text-gray hover:text-purple'
        style={{ transition: '0.3s all ease' }}
        onClick={handleNext}
      >
        <FaCaretRight className='w-[40px] h-[40px]' />
      </button>
    </div>
  );
}

export default HomeViews;
