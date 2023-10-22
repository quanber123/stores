import { useState, useEffect, useMemo, useCallback } from 'react';

function Carousel(length: number) {
  const [breakpoints, setBreakPoints] = useState<number>(4);
  const [indexSlider, setIndexSlider] = useState<number>(0);
  const handlePrev = useCallback(() => {
    setIndexSlider((prevIndex) =>
      prevIndex - 1 < 0 ? length - breakpoints : prevIndex - 1
    );
  }, [indexSlider, breakpoints]);

  const handleNext = useCallback(() => {
    setIndexSlider((prevIndex) =>
      prevIndex + 1 >= length - (breakpoints - 1) ? 0 : prevIndex + 1
    );
  }, [indexSlider, breakpoints]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setBreakPoints(4);
      } else if (window.innerWidth > 780) {
        setBreakPoints(3);
      } else if (window.innerWidth > 640) {
        setBreakPoints(2);
      } else {
        setBreakPoints(1);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const width = useMemo(() => {
    return 100 / breakpoints;
  }, [breakpoints]);
  return { breakpoints, width, indexSlider, handlePrev, handleNext };
}

export default Carousel;
