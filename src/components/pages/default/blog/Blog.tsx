import { useRef, useMemo, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import LazyLoadImage from '@/utils/lazyload-image';
import blogImg from '@/assets/images/bg-02.jpg.webp';
import PreviewBlog from '@/components/single/blog/PreviewBlog';
import { FaArrowDownWideShort } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { getAllTags } from '@/store/slice/tagSlice';
import { getAllCategories } from '@/store/slice/categorySlice';
import './blog.css';
import { getAllBlogs } from '@/store/slice/blogSlice';
function Blog() {
  const blogs = useSelector(getAllBlogs);
  const categories = useSelector(getAllCategories);
  const tags = useSelector(getAllTags);
  const [dropdownCategory, setDropdownCategory] = useState(false);
  const blogTitleRef = useRef(null);
  const blogImgRef = useRef(null);
  const blogTitleCateRef = useRef(null);
  const blogTitleTagRef = useRef(null);
  const blogRefs = useRef<Array<HTMLElement | null>>([]);
  const categoryRefs = useRef<Array<HTMLElement | null>>([]);
  const tagRefs = useRef<Array<HTMLElement | null>>([]);
  const renderedBlog = useMemo(() => {
    return blogs.map((b, index) => {
      return (
        <PreviewBlog
          key={index}
          blog={b}
          refEl={(el) => (blogRefs.current[index] = el)}
        />
      );
    });
  }, [blogs]);
  const renderedCategory = useMemo(() => {
    return categories.map((c, index) => {
      return (
        <button
          ref={(el) => (categoryRefs.current[index] = el)}
          key={index}
          className='btn-category-list flex justify-start py-4 opacity-0 capitalize'
        >
          {c.name}
        </button>
      );
    });
  }, [categories]);
  const renderedTags = useMemo(() => {
    return tags.map((b, index) => {
      return (
        <button
          ref={(el) => (tagRefs.current[index] = el)}
          key={index}
          className='border border-lightGray text-gray hover:border-purple hover:text-purple text-sm px-4 py-[4px] rounded-2xl opacity-0 capitalize'
        >
          {b.name}
        </button>
      );
    });
  }, [tags]);
  const handleDropdown = () => {
    setDropdownCategory((prevState) => !prevState);
  };
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
      gsap.from(blogTitleCateRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'elastic',
      });
      blogRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          gsap.from(ref, {
            x: -200,
            opacity: 0,
            duration: 0.5,
            delay: 0.5 + index * 0.3,
          });
        });
      categoryRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          gsap.to(ref, {
            opacity: 1,
            duration: 0.5,
            delay: 0.75 + index * 0.3,
          });
        });
      gsap.from(blogTitleTagRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: categories.length - 2,
        ease: 'elastic',
      });
      tagRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          gsap.to(ref, {
            opacity: 1,
            duration: 0.5,
            delay: categories.length - 2 + index * 0.3,
          });
        });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <>
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
      <section className='container flex flex-col-reverse desktop:flex-row gap-[80px]'>
        <div className='desktop:w-2/3 flex flex-col gap-[80px]'>
          {blogs.length ? (
            renderedBlog
          ) : (
            <p className='text-center text-xl font-bold'>No Blogs!</p>
          )}
        </div>
        <div className='desktop:w-1/3 flex flex-col gap-[20px] tablet:gap-[40px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='flex justify-between items-center'>
              <h4
                ref={blogTitleCateRef}
                className='text-lg text-semiBoldGray font-bold'
              >
                Categories
              </h4>
              <div className='block desktop:hidden'>
                <FaArrowDownWideShort
                  className='text-lg hover:text-purple cursor-pointer'
                  onClick={handleDropdown}
                />
              </div>
            </div>
            <div
              className={`${
                dropdownCategory ? 'active' : ''
              } dropdown-category opacity-0 desktop:opacity-100 h-0 desktop:h-full flex flex-col gap-[10px] justify-start overflow-hidden`}
            >
              {renderedCategory}
            </div>
          </div>
          <div className='flex flex-col gap-[20px]'>
            <h4
              ref={blogTitleTagRef}
              className='text-lg text-semiBoldGray font-bold'
            >
              Tags
            </h4>
            <div className='flex flex-wrap gap-[5px]'>{renderedTags}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
