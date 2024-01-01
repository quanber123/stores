import { useEffect, useRef, useState } from 'react';

const useLazyComponent = (): [
  React.MutableRefObject<HTMLElement | null>,
  boolean
] => {
  const [inView, setInView] = useState(false);
  const componentRef = useRef<HTMLElement | null>(null);

  const handleIntersection: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setInView(true);
        observer.unobserve(e.target);
      }
    });
  };

  const configOptions = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (componentRef.current) {
      observer = new IntersectionObserver(
        (entries) => handleIntersection(entries, observer!),
        configOptions
      );
      observer.observe(componentRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [inView]);

  return [componentRef, inView];
};

const LazyComponent = ({ children }: { children: React.ReactNode }) => {
  const [componentRef, inView] = useLazyComponent();
  return <section ref={componentRef}>{inView && children}</section>;
};

export default LazyComponent;
