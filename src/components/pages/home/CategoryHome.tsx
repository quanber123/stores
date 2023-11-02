import { useRef, useLayoutEffect } from 'react';
import demoimg from '@/assets/images/banner-01.jpg.webp';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewCategory from '@/components/single/category/PreviewCategory';
function CategoryHome() {
  const categoryRef = useRef<Array<HTMLElement | null>>([]);
  const { isVisible, containerRef } = useObserver();
  const categories = [
    {
      imgSrc: demoimg,
      title: 'Women',
      description: 'Spring 2018',
    },
    {
      imgSrc: demoimg,
      title: 'Women',
      description: 'Spring 2018',
    },
    {
      imgSrc: demoimg,
      title: 'Women',
      description: 'Spring 2018',
    },
  ];
  const renderedCategory = categories.map((c, index) => {
    return (
      <PreviewCategory
        key={index}
        category={c}
        refEl={(el) => (categoryRef.current[index] = el)}
      />
    );
  });
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      categoryRef.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            x: -200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: (3 - index) * 0.3,
          }
        );
      });
    });
    return () => {
      ctx.revert();
    };
  }, [isVisible]);
  return (
    <section
      ref={containerRef}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } container relative w-full h-full flex flex-col laptop:flex-row justify-between gap-[20px]`}
    >
      {renderedCategory}
    </section>
  );
}

export default CategoryHome;
