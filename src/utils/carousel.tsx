import { useState, useEffect, useMemo } from 'react';
function Carousel(length: number) {
  const [breakpoints, setBreakPoints] = useState<number>(4);
  const [indexSlider, setIndexSlider] = useState<number>(0);
  const handlePrev = () => {
    setIndexSlider((prevIndex) =>
      prevIndex - 1 < 0 ? length - breakpoints : prevIndex - 1
    );
  };
  const handleNext = () => {
    setIndexSlider((prevIndex) =>
      prevIndex + 1 >= length - (breakpoints - 1) ? 0 : prevIndex + 1
    );
  };

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
    handleResize();
    const infinite = setInterval(() => {
      handleNext();
    }, 3000);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(infinite);
    };
  }, []);
  const width = useMemo(() => {
    return 100 / breakpoints;
  }, [breakpoints]);
  return { breakpoints, width, indexSlider, handlePrev, handleNext };
}

export default Carousel;
