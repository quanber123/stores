import React, {
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import { FaArrowDownWideShort, FaXmark } from 'react-icons/fa6';
import {
  getAllProducts,
  getTotalPage,
  setAllProducts,
} from '@/store/slice/productSlice';
import { getAllCategories } from '@/store/slice/categorySlice';
import { capitalize } from '@/utils/capitalize';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/features/productFeatures';
import './shop.css';
import { getAllTags } from '@/store/slice/tagSlice';
import LoadingData from '@/components/common/LoadingData';
function Shop() {
  const dispatch = useDispatch();
  const totalPage = useSelector(getTotalPage);
  const categories = useSelector(getAllCategories);
  const tags = useSelector(getAllTags);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const queryCategory = searchQuery.get('c') ?? '';
  const queryTag = searchQuery.get('t') ?? '';
  const queryArrange = searchQuery.get('arrange') ?? '';
  const pageCategory = searchQuery.get('p') ? Number(searchQuery.get('p')) : 1;
  const products = useSelector(getAllProducts);
  const {
    data: dataProducts,
    isSuccess: isSuccessProduct,
    isFetching: isFetchingProduct,
  } = useGetProductsQuery({
    category: queryCategory,
    tag: queryTag,
    arrange: queryArrange,
    page: pageCategory,
  });
  const [modalFilter, setModalFilter] = useState(false);
  const productRefs = useRef<Array<HTMLElement | null>>([]);
  const subRouteRefs = useRef<Array<HTMLElement | null>>([]);
  const btnRef = useRef(null);
  const handleChangeQuery = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const name = String(e.currentTarget.getAttribute('data-name'));
      const value = String(e.currentTarget.getAttribute('value'));
      setSearchQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        if (value.trim() !== '') {
          newQuery.set(name, value);
          if (name !== 'p') {
            newQuery.set('p', '1');
          }
          if (name === 'arrange' && value === 'default') {
            newQuery.set('p', '1');
            newQuery.delete('c');
            newQuery.delete('t');
            newQuery.delete('arrange');
          }
        } else {
          newQuery.delete(name);
        }
        return newQuery.toString();
      });
    },
    [searchQuery]
  );
  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProducts));
    }
  }, [isSuccessProduct, dataProducts]);
  const renderedProducts = useMemo(
    () =>
      products?.map((p, index) => {
        return (
          <PreviewProduct
            key={index}
            product={p}
            refEl={(el) => (productRefs.current[index] = el)}
          />
        );
      }),
    [products]
  );
  const renderedCategories = categories.map((c, index) => {
    return (
      <li
        ref={(el) => (subRouteRefs.current[index + 1] = el)}
        className={`sub-routes ${queryCategory === c.name ? 'active' : ''}`}
        key={index + 1}
        data-name='c'
        value={c.name}
        onClick={handleChangeQuery}
        aria-disabled={isFetchingProduct ? true : false}
      >
        {capitalize(c.name)}
      </li>
    );
  });
  const renderTags = tags.map((t) => {
    return (
      <li key={t._id} className='w-1/4'>
        <button
          className={`border hover:border-purple hover:text-purple text-sm px-4 py-[4px] rounded-2xl ${
            queryTag === t.name
              ? 'border-purple text-purple'
              : 'border-semiBoldGray text-semiBoldGray'
          }`}
          onClick={handleChangeQuery}
          data-name='t'
          value={t.name}
        >
          {capitalize(t.name)}
        </button>
      </li>
    );
  });
  const openFilter = () => {
    setModalFilter((prevState) => (prevState = !prevState));
  };
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
      gsap.to(btnRef.current, {
        x: 0,
        opacity: 1,
        // duration: 0.5,
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (products.length > 0) {
        productRefs.current.forEach((ref, index) => {
          gsap.fromTo(
            ref,
            {
              x: 200,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.3,
            }
          );
        });
      }
    });
    return () => ctx.revert();
  }, [products]);
  return (
    <>
      <section className='container flex flex-col gap-[40px]'>
        <div className='block laptop:flex justify-between items-center gap-[40px]'>
          <ul className='flex justify-center items-center gap-[20px]'>
            <li
              ref={(el) => (subRouteRefs.current[0] = el)}
              className={`sub-routes ${queryCategory === '' ? 'active' : ''}`}
              data-name='c'
              value={''}
              onClick={handleChangeQuery}
              aria-disabled={isFetchingProduct ? true : false}
            >
              All Products
            </li>
            {renderedCategories}
          </ul>
          <button
            ref={btnRef}
            className={`mx-auto my-4 laptop:m-0 flex items-center gap-[8px] btn-filter ${
              modalFilter ? 'active' : ''
            }`}
            style={{ transform: 'translateX(200px)', opacity: 0 }}
            onClick={openFilter}
          >
            {modalFilter ? <FaXmark /> : <FaArrowDownWideShort />}
            <span>Filter</span>
          </button>
        </div>
        <div className={`dropdown-filter ${modalFilter ? 'active' : ''}`}>
          <div className='flex flex-col gap-[10px]'>
            <h3 className='font-bold text-semiBoldGray'>Sort By</h3>
            <ul className='flex flex-col gap-[5px] text-darkGray'>
              <li>
                <button
                  data-name='arrange'
                  value='default'
                  onClick={handleChangeQuery}
                >
                  Default
                </button>
              </li>
              <li>
                <button
                  data-name='arrange'
                  value='date'
                  onClick={handleChangeQuery}
                >
                  Newness
                </button>
              </li>
              <li>
                <button
                  data-name='arrange'
                  value='-price'
                  onClick={handleChangeQuery}
                >
                  Price: Low to High
                </button>
              </li>
              <li>
                <button
                  data-name='arrange'
                  value='price'
                  onClick={handleChangeQuery}
                >
                  Price: High to Low
                </button>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <h3 className='font-bold text-semiBoldGray'>Tags</h3>
            <ul className='flex flex-wrap gap-[5px]'>{renderTags}</ul>
          </div>
        </div>
      </section>
      {renderedProducts.length && !isFetchingProduct ? (
        <section className='container m-auto flex flex-col gap-[40px]'>
          <div className='product-list'>{renderedProducts}</div>
          <div
            className={`${
              totalPage > 1 ? 'flex' : 'hidden'
            } justify-center gap-[10px]`}
          >
            {(() => {
              const pageElements = [];
              for (let index = 1; index <= totalPage; index++) {
                pageElements.push(
                  <button
                    className={`pagination ${
                      index === pageCategory ? 'active' : ''
                    }`}
                    key={index}
                    data-name='p'
                    value={index}
                    onClick={handleChangeQuery}
                    disabled={isFetchingProduct ? true : false}
                  >
                    {index}
                  </button>
                );
              }
              return pageElements;
            })()}
          </div>
        </section>
      ) : (
        <></>
      )}
      {!products.length && !isFetchingProduct ? (
        <section className='container h-[20vh] flex justify-center items-center'>
          <p className='text-2xl tablet:text-4xl text-semiBoldGray font-bold'>
            Not Found Product!
          </p>
        </section>
      ) : (
        <></>
      )}
      {isFetchingProduct ? <LoadingData /> : <></>}
    </>
  );
}

export default Shop;
