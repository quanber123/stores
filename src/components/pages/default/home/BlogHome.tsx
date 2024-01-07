import { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { useObserver } from '@/hooks/useObserver';
import PreviewBlogHome from '@/components/ui/blog/PreviewBlogHome';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import {
  getAllBlogsOverview,
  setAllBlogsOverView,
} from '@/services/redux/slice/blogSlice';
import { useCarousel } from '@/hooks/useCarousel';
import { useGetBlogsQuery } from '@/services/redux/features/blogFeatures';
function BlogHome() {
  const dispatch = useDispatch();
  const blogs = useSelector(getAllBlogsOverview);
  const { width, indexSlider, breakpoints, handlePrev, handleNext } =
    useCarousel(blogs.length);
  const titleRef = useRef(null);
  const blogRefs = useRef<Array<HTMLElement | null>>([]);
  const { isVisible, containerRef } = useObserver();
  const { data: dataBlogs, isSuccess: isSuccessBlogs } = useGetBlogsQuery({
    search: 'page=1',
  });
  useEffect(() => {
    if (isSuccessBlogs && dataBlogs) {
      dispatch(setAllBlogsOverView(dataBlogs));
    }
  }, [isSuccessBlogs]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      blogRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          if (ref) {
            gsap.fromTo(
              ref,
              { x: 200, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                delay: index * 0.3,
              }
            );
          }
        });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: 0,
          opacity: 1,
          ease: 'elastic',
          duration: 2.5,
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isVisible]);
  const renderedBlog = useMemo(() => {
    return blogs.map((b, index) => {
      return (
        <PreviewBlogHome
          style={{ width: `calc(${width}% - 20px)` }}
          key={index}
          blog={b}
          refEl={(el) => (blogRefs.current[index] = el)}
        />
      );
    });
  }, [blogs, breakpoints]);
  return (
    <div
      ref={containerRef}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } relative w-full h-full flex flex-col justify-center items-center gap-[20px] overflow-hidden`}
    >
      <h2
        ref={titleRef}
        className='text-center text-xl tablet:text-4xl text-darkGray font-bold'
        style={{ transform: 'translateX(-120px)', opacity: 0 }}
      >
        Our Blogs
      </h2>
      <div className='container relative mt-4'>
        <div className={`max-w-[${width * breakpoints}%] overflow-hidden`}>
          <div
            className='w-full flex items-stretch gap-[20px]'
            style={{
              transform: `translateX(-${indexSlider * width}%)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {renderedBlog}
          </div>
        </div>
        {blogs.length > breakpoints ? (
          <div className='text-xl'>
            <FaAngleLeft
              className='absolute z-50 top-1/2 -left-[1%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
              onClick={handlePrev}
            />
            <FaAngleRight
              className='absolute z-50 top-1/2 -right-[1%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
              onClick={handleNext}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default BlogHome;
