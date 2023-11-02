import { useState, useEffect, useMemo, useCallback } from 'react';
function Carousel(length: number) {
  const [breakpoints, setBreakPoints] = useState<number>(4);
  const [indexSlider, setIndexSlider] = useState<number>(0);

  const handlePrev = useCallback(() => {
    setIndexSlider((prevIndex) =>
      prevIndex - 1 < 0 ? length - breakpoints : prevIndex - 1
    );
  }, [length]);

  const handleNext = useCallback(() => {
    setIndexSlider((prevIndex) =>
      prevIndex + 1 >= length - (breakpoints - 1) ? 0 : prevIndex + 1
    );
  }, [length]);

  const handleResize = () => {
    let newBreakpoints;
    if (window.innerWidth > 1280) {
      newBreakpoints = 4;
    } else if (window.innerWidth > 780) {
      newBreakpoints = 3;
    } else if (window.innerWidth > 640) {
      newBreakpoints = 2;
    } else {
      newBreakpoints = 1;
    }
    setBreakPoints(newBreakpoints);
  };

  useEffect(() => {
    const infinite = setInterval(() => {
      handleNext();
    }, 3000);

    handleResize(); // Xử lý kích thước ban đầu

    const handleResizeListener = () => {
      handleResize();
    };

    window.addEventListener('resize', handleResizeListener);

    return () => {
      window.clearInterval(infinite);
      window.removeEventListener('resize', handleResizeListener);
    };
  }, []);

  const width = useMemo(() => {
    return 100 / breakpoints;
  }, [breakpoints]);

  return { breakpoints, width, indexSlider, handlePrev, handleNext };
}

export default Carousel;
