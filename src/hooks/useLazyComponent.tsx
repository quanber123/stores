import { useEffect, useRef, useState } from 'react';

const useLazyComponent = (): [
  React.MutableRefObject<HTMLElement | null>,
  boolean
] => {
  const [inView, setInView] = useState(false);
  const componentRef = useRef<HTMLElement | null>(null);
  let handleIntersection: IntersectionObserverCallback = (entries, _) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setInView(true);
      }
    });
  };
  const configOptions = {
    rootMargin: '0px',
    threshold: 0.1,
  };
  useEffect(() => {
    let observer: IntersectionObserver = new IntersectionObserver(
      handleIntersection,
      configOptions
    );
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => {
      observer.disconnect;
    };
  }, []);
  return [componentRef, inView];
};

const LazyComponent = ({ children }: { children: React.ReactNode }) => {
  const [componentRef, inView] = useLazyComponent();
  return <section ref={componentRef}>{inView && children}</section>;
};

export default LazyComponent;
