import { useRef, useLayoutEffect, useMemo, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import {
  FaArrowDownWideShort,
  FaMagnifyingGlass,
  FaXmark,
} from 'react-icons/fa6';
import {
  getAllCategories,
  getAllTags,
} from '@/services/redux/slice/labelSlice';
import { capitalize } from '@/services/utils/format';
import useQueryString from '@/hooks/useQueryString';
const ProductFilter = () => {
  const [queryString, handleChangeQuery] = useQueryString();
  const categories = useSelector(getAllCategories);
  const tags = useSelector(getAllTags);
  const [dropdownFilter, setDropdownFilter] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState(false);
  const subRouteRefs = useRef<Array<HTMLElement | null>>([]);
  const btnFilterRef = useRef(null);
  const btnSearchRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const sortButtons = [
    {
      name: 'Newness',
      value: 'date',
      type: 'sort',
    },
    {
      name: 'Oldness',
      value: '-date',
      type: 'sort',
    },
    {
      name: 'Price: Low to High',
      value: '-price',
      type: 'sort',
    },
    {
      name: 'Price: High to Low',
      value: 'price',
      type: 'sort',
    },
  ];
  const renderedCategories = useMemo(() => {
    return categories.map((c, index) => {
      const type = 'category';
      return (
        <li
          ref={(el) => (subRouteRefs.current[index + 1] = el)}
          className={`sub-routes ${
            queryString[type]?.replace(/\+/g, ' ') === c.name ? 'active' : ''
          }`}
          key={index + 1}
          data-name={type}
          value={c.name}
          onClick={() => handleChangeQuery(type, c.name)}
        >
          {capitalize(c.name)}
        </li>
      );
    });
  }, [categories, queryString]);
  const renderedTags = useMemo(() => {
    const type = 'tag';
    return tags.map((t) => {
      return (
        <li key={t._id} className='tablet:w-1/4'>
          <button
            className={`border hover:border-purple hover:text-purple text-sm px-4 py-[4px] rounded-2xl ${
              queryString[type]?.replace(/\+/g, ' ') === t.name
                ? 'border-purple text-purple'
                : 'border-semiBoldGray text-semiBoldGray'
            }`}
            data-name={type}
            value={t.name}
            onClick={() => handleChangeQuery(type, t.name)}
          >
            {capitalize(t.name)}
          </button>
        </li>
      );
    });
  }, [tags, queryString]);
  const renderSortBtn = useMemo(() => {
    return sortButtons.map((s, index) => {
      return (
        <li
          className={`${
            queryString[s.type] === s.value ? 'text-purple font-bold' : ''
          }  ? 'text-purple font-bold' : ''}`}
          key={index}
        >
          <button
            data-name={s.type}
            value={s.value}
            onClick={() => handleChangeQuery(s.type, s.value)}
          >
            {s.name}
          </button>
        </li>
      );
    });
  }, [queryString]);
  const openFilter = useCallback(() => {
    if (dropdownSearch) {
      setDropdownSearch((prevState) => (prevState = !prevState));
    }
    setDropdownFilter((prevState) => (prevState = !prevState));
  }, [dropdownFilter, dropdownSearch]);
  const openSearch = useCallback(() => {
    if (dropdownFilter) {
      setDropdownFilter((prevState) => (prevState = !prevState));
    }
    setDropdownSearch((prevState) => (prevState = !prevState));
  }, [dropdownSearch, dropdownFilter]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleChangeQuery('search', inputValue);
      }
    },
    [inputValue]
  );
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      subRouteRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            x: -200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            // duration: 0.5,
            delay: (3 - index) * 0.3,
          }
        );
      });
      gsap.to(btnFilterRef.current, {
        x: 0,
        opacity: 1,
        // duration: 0.5,
      });
      gsap.to(btnSearchRef.current, {
        x: 0,
        opacity: 1,
        // duration: 0.5,
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <section className='container mt-[40px] flex flex-col gap-[40px]'>
      <div className='block laptop:flex justify-between items-center gap-[40px] text-sm tablet:text-base'>
        <ul className='flex justify-center items-center gap-[20px]'>
          <li
            ref={(el) => (subRouteRefs.current[0] = el)}
            className={`sub-routes ${!queryString['category'] ? 'active' : ''}`}
            data-name='category'
            value={'default'}
            onClick={() => handleChangeQuery('category', 'default')}
          >
            All Products
          </li>
          {renderedCategories}
        </ul>
        <div className='flex items-center gap-[20px]'>
          <button
            ref={btnFilterRef}
            className={`mx-auto my-4 laptop:m-0 flex items-center gap-[8px] btn-filter ${
              dropdownFilter ? 'active' : ''
            }`}
            style={{ transform: 'translateX(200px)', opacity: 0 }}
            onClick={openFilter}
          >
            {dropdownFilter ? <FaXmark /> : <FaArrowDownWideShort />}
            <span>Filter</span>
          </button>
          <button
            ref={btnSearchRef}
            className={`mx-auto my-4 laptop:m-0 flex items-center gap-[8px] btn-search ${
              dropdownSearch ? 'active' : ''
            }`}
            style={{ transform: 'translateX(200px)', opacity: 0 }}
            onClick={openSearch}
          >
            {dropdownSearch ? <FaXmark /> : <FaMagnifyingGlass />}
            <span>Search</span>
          </button>
        </div>
      </div>
      <div>
        <div
          style={{ transition: 'height 0.2s linear' }}
          className={`bg-lightGray flex flex-col tablet:flex-row tablet:justify-between overflow-y-auto ${
            dropdownFilter ? 'tablet:h-[218px] h-[50vh]' : 'h-0'
          }`}
        >
          <div className='tablet:w-1/2 m-4 flex flex-col gap-[10px]'>
            <h3 className='font-bold text-semiBoldGray'>Sort By</h3>
            <ul className='flex flex-col gap-[5px] text-darkGray'>
              {renderSortBtn}
            </ul>
          </div>
          <div className='tablet:w-1/2 m-4 flex flex-col gap-[10px]'>
            <h3 className='font-bold text-semiBoldGray'>Tags</h3>
            <ul className='flex flex-wrap gap-[5px]'>{renderedTags}</ul>
          </div>
        </div>
        <div
          ref={searchRef}
          className={`dropdown-search ${dropdownSearch ? 'active' : ''}`}
        >
          <FaMagnifyingGlass
            className='absolute top-1/2 -translate-y-1/2 left-[24px] z-10 text-md hover:text-purple cursor-pointer'
            onClick={() => handleChangeQuery('search', inputValue)}
          />
          <input
            className='h-full w-full'
            type='text'
            placeholder='Search...'
            aria-label='search-product'
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;
