import { useRef, useLayoutEffect, RefObject } from 'react';
import demoimg from '@/assets/images/blog-02.jpg.webp';
import gsap from 'gsap';
import { useObserver } from '@/components/customHooks/useObserver';
import PreviewBlog from '@/components/single-blog/PreviewBlog';

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
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      blogRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { y: '180px', opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 2,
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
      } relative w-full h-full flex flex-col items-center justify-center gap-[20px] overflow-hidden`}
    >
      <h2
        ref={titleRef}
        className='text-4xl text-darkGray font-bold'
        style={{ transform: 'translateX(-120px)', opacity: 0 }}
      >
        Our Blogs
      </h2>
      <div className='mt-4 flex justify-center items-stretch gap-[20px]'>
        {blogs.map((b, index) => (
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
        ))}
      </div>
    </section>
  );
}
export default BlogHome;
