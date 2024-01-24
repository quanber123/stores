import { useEffect, useRef, useState } from 'react';

const useScrollPage = (totalPage: number) => {
  const [currPage, setCurrPage] = useState(1);
  const elementRef = useRef<any | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[entries.length - 1];
        if (lastEntry && lastEntry.isIntersecting) {
          setCurrPage((prevPage) => Math.min(prevPage + 1, totalPage));
        }
      },
      { threshold: 0 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [totalPage]);

  return [currPage, elementRef] as const;
};

export default useScrollPage;
