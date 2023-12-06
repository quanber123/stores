import React, { useState, useEffect, useRef } from 'react';
type LazyLoadImageProps = {
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
};

const LazyLoadImage: React.FC<LazyLoadImageProps> = (props) => {
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  let handleIntersection: IntersectionObserverCallback = (entries, _) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };
  const configOptions = {
    rootMargin: '0px',
    threshold: 0.5,
  };
  useEffect(() => {
    let observer: IntersectionObserver = new IntersectionObserver(
      handleIntersection,
      configOptions
    );
    if (imgRef?.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return inView ? (
    <img {...props} />
  ) : (
    <div ref={imgRef} className={`skeleton-img`}></div>
  );
};

export default LazyLoadImage;
