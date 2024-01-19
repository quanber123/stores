import React, { useState, useEffect, useRef, useCallback } from 'react';
type LazyLoadImageProps = {
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
};

function LazyLoadImage(props: LazyLoadImageProps) {
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  let handleIntersection: IntersectionObserverCallback = useCallback(
    (entries, _) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      });
    },
    [props]
  );
  useEffect(() => {
    const configOptions = {
      rootMargin: '0px',
      threshold: 0.2,
    };
    let observer: IntersectionObserver = new IntersectionObserver(
      handleIntersection,
      configOptions
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <img
      {...props}
      {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >)}
    />
  ) : (
    <div ref={imgRef} className={`skeleton w-[290px] h-[350px]`}></div>
  );
}

export default LazyLoadImage;
