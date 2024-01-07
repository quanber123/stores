import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import LazyLoadImage from '@/services/utils/lazyload-image';
import blogImg from '@/assets/images/bg-02.jpg.webp';
function BlogTitle() {
  const blogTitleRef = useRef(null);
  const blogImgRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blogImgRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
      });
      gsap.from(blogTitleRef.current, {
        y: -100,
        opacity: 0,
        duration: 2.5,
        delay: 0.3,
        ease: 'elastic',
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <section className='relative h-[240px] overflow-hidden'>
      <div className='w-full h-full' ref={blogImgRef}>
        <LazyLoadImage src={blogImg} alt='' className='w-full h-full' />
      </div>
      <h2
        ref={blogTitleRef}
        className='absolute top-1/2 left-1/2 z-20 text-white text-3xl font-bold'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        Blog
      </h2>
    </section>
  );
}

export default BlogTitle;
