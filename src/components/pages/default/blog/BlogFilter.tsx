import { useRef, useMemo, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { FaArrowDownWideShort } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { getAllTags } from '@/store/slice/tagSlice';
import { getAllCategories } from '@/store/slice/categorySlice';
import useQueryString from '@/hooks/useQueryString';
import { capitalize } from '@/utils/format';
function BlogFilter() {
  const [queryString, handleChangeQuery] = useQueryString();
  const categories = useSelector(getAllCategories);
  const tags = useSelector(getAllTags);
  const [dropdownCategory, setDropdownCategory] = useState(false);
  const blogTitleCateRef = useRef(null);
  const blogTitleTagRef = useRef(null);
  const categoryRefs = useRef<Array<HTMLElement | null>>([]);
  const tagRefs = useRef<Array<HTMLElement | null>>([]);
  const renderedCategory = useMemo(() => {
    const type = 'category';
    return categories.map((c, index) => {
      return (
        <button
          ref={(el) => (categoryRefs.current[index + 1] = el)}
          key={c._id}
          className={`btn-category-list flex justify-start py-4 opacity-0 capitalize ${
            queryString[type]?.replace(/\+/g, ' ') === c.name ? 'active' : ''
          }`}
          onClick={() => handleChangeQuery(type, c.name)}
        >
          {c.name}
        </button>
      );
    });
  }, [categories, queryString]);
  const renderedTags = useMemo(() => {
    const type = 'tag';
    return tags.map((t, index) => {
      return (
        <li key={t._id} ref={(el) => (tagRefs.current[index] = el)}>
          <button
            className={`border hover:border-purple hover:text-purple text-sm px-4 py-[4px] rounded-2xl ${
              queryString[type]?.replace(/\+/g, ' ') == t.name
                ? 'border-purple text-purple'
                : 'border-semiBoldGray text-semiBoldGray'
            }`}
            onClick={() => handleChangeQuery(type, t.name)}
          >
            {capitalize(t.name)}
          </button>
        </li>
      );
    });
  }, [tags, queryString]);
  const handleDropdown = () => {
    setDropdownCategory((prevState) => !prevState);
  };
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blogTitleCateRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'elastic',
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
          <button
            ref={(el) => (categoryRefs.current[0] = el)}
            className={`btn-category-list flex justify-start py-4 opacity-0 capitalize ${
              !queryString['category'] ? 'active' : ''
            }`}
            data-name='category'
            value={'default'}
            onClick={() => handleChangeQuery('category', 'default')}
          >
            All Category
          </button>
          {renderedCategory}
        </div>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <h3
          ref={blogTitleTagRef}
          className='text-lg text-semiBoldGray font-bold'
        >
          Tags
        </h3>
        <ul className='flex flex-wrap gap-[5px]'>{renderedTags}</ul>
      </div>
    </div>
  );
}

export default BlogFilter;
