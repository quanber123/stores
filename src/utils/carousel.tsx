import { useState } from 'react';
function Carousel(length: number) {
  const [breakpoints, setBreakPoints] = useState<number>(4);
  const [indexSlider, setIndexSlider] = useState<number>(0);
  const width = 315;
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
  return { breakpoints, width, indexSlider, handlePrev, handleNext };
}

export default Carousel;
