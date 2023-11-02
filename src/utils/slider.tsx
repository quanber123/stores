import { useState, useEffect, useCallback } from 'react';

function Slider(length: number) {
  const [indexImage, setIndexImage] = useState<number>(0);
  const handleIndex = (index: number) => {
    setIndexImage((prevIndex) => {
      return (prevIndex = index);
    });
  };
  const handlePrev = useCallback(() => {
    setIndexImage((prevIndex) => {
      if (prevIndex === 0) return length - 1;
      return prevIndex - 1;
    });
  }, [length]);
  const handleNext = useCallback(() => {
    setIndexImage((prevIndex) => {
      if (prevIndex === length - 1) return 0;
      return prevIndex + 1;
    });
  }, [length]);
  useEffect(() => {
    const infiniteSlider = setInterval(() => {
      handleNext();
    }, 5000);
    return clearInterval(infiniteSlider);
  }, []);
  return { indexImage, handlePrev, handleNext, handleIndex };
}

export default Slider;
