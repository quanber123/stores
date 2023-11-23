import React, { useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import { FaArrowDownWideShort } from '@/assets/icons/index';
import {
  getAllProducts,
  getTotalPage,
  setAllProducts,
} from '@/store/slice/productSlice';
import { getAllCategories } from '@/store/slice/categorySlice';
import { capitalize } from '@/utils/capitalize';
import { useSearchParams } from 'react-router-dom';
import './shop.css';
import { useGetProductsQuery } from '@/store/features/productFeatures';
function Shop() {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const totalPage = useSelector(getTotalPage);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const queryCategory = searchQuery.get('c') ?? '';
  const pageCategory = searchQuery.get('p') ?? 1;
  const products = useSelector(getAllProducts);
  const { data: dataProducts, isSuccess: isSuccessProduct } =
    useGetProductsQuery({
      category: queryCategory,
      page: Number(pageCategory),
    });
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
        } else {
          newQuery.delete(name);
        }

        return newQuery.toString();
      });
    },
    [queryCategory]
  );
  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProducts));
    }
  }, [dispatch, isSuccessProduct, queryCategory, pageCategory]);
  const renderedProducts = products.map((p, index) => {
    return (
      <PreviewProduct
        key={index}
        product={p}
        refEl={(el) => (productRefs.current[index] = el)}
      />
    );
  });
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
    });
    return () => ctx.revert();
  }, [queryCategory, pageCategory]);
  return (
    <>
      <section>
        <div className='container block laptop:flex justify-between items-center gap-[40px]'>
          <ul className='flex justify-center items-center gap-[20px]'>
            <li
              ref={(el) => (subRouteRefs.current[0] = el)}
              className={`sub-routes ${queryCategory === '' ? 'active' : ''}`}
              data-name='c'
              value={''}
              onClick={handleChangeQuery}
            >
              All Products
            </li>
            {categories.map((c, index) => {
              return (
                <li
                  ref={(el) => (subRouteRefs.current[index + 1] = el)}
                  className={`sub-routes ${
                    queryCategory === c.name ? 'active' : ''
                  }`}
                  key={index + 1}
                  data-name='c'
                  value={c.name}
                  onClick={handleChangeQuery}
                >
                  {capitalize(c.name)}
                </li>
              );
            })}
          </ul>
          <button
            ref={btnRef}
            className='mx-auto my-4 laptop:m-0 flex items-center gap-[8px] border-lightGray border px-6 py-2 rounded-[4px] text-darkGray hover:text-white hover:bg-purple'
            style={{ transform: 'translateX(200px)', opacity: 0 }}
          >
            <FaArrowDownWideShort />
            <span>Filter</span>
          </button>
        </div>
      </section>
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
                    index === Number(pageCategory) ? 'active' : ''
                  }`}
                  key={index}
                  data-name='p'
                  value={index}
                  onClick={handleChangeQuery}
                >
                  {index}
                </button>
              );
            }
            return pageElements;
          })()}
        </div>
      </section>
    </>
  );
}

export default Shop;
