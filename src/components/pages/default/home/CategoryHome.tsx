import { useRef, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useObserver } from '@/hooks/useObserver';
import PreviewCategory from '@/components/single/category/PreviewCategory';
import { getAllCategories } from '@/store/slice/categorySlice';
function CategoryHome() {
  const categories = useSelector(getAllCategories);
  const categoryRef = useRef<Array<HTMLElement | null>>([]);
  const { isVisible, containerRef } = useObserver();
  const renderedCategory = useMemo(
    () =>
      categories.map((c, index) => {
        return (
          <PreviewCategory
            key={index}
            category={c}
            refEl={(el) => (categoryRef.current[index] = el)}
          />
        );
      }),
    [categories]
  );
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
    <div
      ref={containerRef}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } container relative w-full h-full flex flex-col laptop:flex-row justify-between gap-[20px]`}
    >
      {renderedCategory}
    </div>
  );
}

export default CategoryHome;
