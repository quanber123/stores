import React, { useState, useEffect, useRef } from 'react';
type LazyLoadImageProps = {
  src: string;
  alt?: string | null;
  className?: string;
  style?: React.CSSProperties | undefined;
};

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({
  src,
  alt,
  className,
  style,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const handleIntersection: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && src !== imageSrc) {
          setImageSrc(src);
          if (obs && imgRef.current) {
            obs.unobserve(imgRef.current);
          }
        }
      });
    };

    if (imgRef.current && src !== imageSrc) {
      observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      });
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, imageSrc]);

  return (
    <img
      ref={imgRef}
      className={`${className}`}
      src={imageSrc}
      alt={alt ? alt : undefined}
      style={style}
    />
  );
};

export default LazyLoadImage;
