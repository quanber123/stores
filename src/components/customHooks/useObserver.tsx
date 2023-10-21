import { useEffect, useRef, useState } from 'react';
export const useObserver = () => {
  type OptionsLazy = {
    root: Element | null;
    rootMargin: string;
    threshold: number | number[];
  };
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setIsVisible(true);
      }
    });
  };
  useEffect(() => {
    const options: OptionsLazy = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    if (containerRef?.current)
      observer.observe(containerRef?.current as HTMLElement);
    return () => {
      if (containerRef?.current)
        observer.unobserve(containerRef?.current as HTMLElement);
    };
  }, []);
  return { containerRef, isVisible };
};
