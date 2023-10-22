import { useRef, useLayoutEffect, RefObject } from 'react';
import gsap from 'gsap';
import demoimg from '@/assets/images/blog-02.jpg.webp';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewBlog from '@/components/single-blog/PreviewBlog';
import { FaAngleLeft, FaAngleRight } from '@/assets/icons/index';
import Carousel from '@/utils/carousel';

function BlogHome() {
  const titleRef = useRef(null);
  const blogRefs = useRef<Array<RefObject<HTMLElement> | null>>([]);
  const { isVisible, containerRef } = useObserver();
  const blogs = [
    {
      title: 'The Great Big List of Men’s Gifts for the Holidays',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2017',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      title: 'The Great Big List of Men’s Gifts for the Holidays',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2017',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      title:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, debitis facilis!',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2017',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      title:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, debitis facilis!',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2017',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      title: 'The Great Big List of Men’s Gifts for the Holidays',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2019',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
    {
      title:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, debitis facilis!',
      description:
        'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
      author: 'Nancy Ward',
      date: 'July 18, 2020',
      srcImg: demoimg,
      altImg: 'Esprit Ruffle Shirt',
    },
  ];
  const { width, indexSlider, breakpoints, handlePrev, handleNext } = Carousel(
    blogs.length
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      blogRefs.current.forEach((ref, index) => {
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

  return (
    <section
      ref={containerRef}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } relative w-full h-full flex flex-col justify-center items-center gap-[20px] overflow-hidden`}
    >
      <h2
        ref={titleRef}
        className='text-center text-4xl text-darkGray font-bold'
        style={{ transform: 'translateX(-120px)', opacity: 0 }}
      >
        Our Blogs
      </h2>
      <div className='container relative mt-4'>
        <div className={`max-w-[${width * breakpoints}%] overflow-hidden`}>
          <div
            className='w-full flex justify-between items-center gap-[20px]'
            style={{
              width: `${width * breakpoints}%`,
              transform: `translateX(-${indexSlider * width}%)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {blogs.map((b, index) => {
              return (
                <PreviewBlog
                  key={index}
                  srcImg={b.srcImg}
                  altImg={b.title}
                  refEl={(el: any) => {
                    blogRefs.current[index] = el;
                  }}
                  author={b.author}
                  date={b.date}
                  title={b.title}
                  description={b.description}
                />
              );
            })}
          </div>
        </div>
        <div className='text-xl'>
          <FaAngleLeft
            className='absolute z-50 top-1/2 -left-[80px] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
            onClick={handlePrev}
          />
          <FaAngleRight
            className='absolute z-50 top-1/2 -right-[80px] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
            onClick={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
export default BlogHome;
