import React, { useState, useCallback, ChangeEvent, LegacyRef } from 'react';
import Slider from '@/utils/slider';
import {
  FaAngleRight,
  FaAngleLeft,
  FaCartPlus,
  FaHeart,
  FaFacebookF,
} from '@/assets/icons/index';
import LazyLoadImage from '@/utils/lazyload-image';
import { Product } from '@/interfaces/interfaces';
type Props = {
  product: Product;
  refEl: LegacyRef<HTMLElement>;
};
const ProductDetails: React.FC<Props> = ({ product, refEl }) => {
  const { title, code, shortDescription, price, images, categories, tabs } =
    product;
  const [count, setCount] = useState<number>(1);
  const { indexImage, handlePrev, handleNext, handleIndex } = Slider(
    images?.length
  );
  const renderList = images?.map((image, index) => {
    return (
      <LazyLoadImage
        key={index}
        className='object-cover'
        src={image}
        alt=''
        style={{
          transform: `translateX(${-100 * indexImage}%)`,
          transition: 'all 0.3s ease-in-out',
        }}
      />
    );
  });
  const wrapImages = images?.map((image, index) => {
    return (
      <div
        className='w-[70px] h-[84px]'
        key={index}
        onClick={() => handleIndex(index)}
      >
        <LazyLoadImage
          src={image}
          className='w-[70px] h-[84px] cursor-pointer'
          alt={image}
          style={{ border: `${indexImage === index ? '1px solid #ccc' : ''}` }}
        />
      </div>
    );
  });
  const handleChangeCount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCount(Number(e.target.value));
    },
    [count]
  );
  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [count]);
  const handleDecrease = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount <= 1) {
        return 1;
      } else {
        return prevCount - 1;
      }
    });
  }, [count]);
  return (
    <section className='container' ref={refEl}>
      <article className='flex flex-col laptop:flex-row justify-between gap-[40px]'>
        <section className='flex flex-col mobileLg:flex-row gap-[40px]'>
          <div className='flex flex-row mobileLg:flex-col justify-between mobileLg:justify-start mobileLg:gap-[40px]'>
            {wrapImages}
          </div>
          <div className='relative max-w-[514px] max-h-[634px] overflow-hidden flex'>
            {renderList}
            <button
              className='absolute top-1/2 left-0 z-20 w-[40px] h-[40px] flex justify-center items-center text-white bg-overlayBlack hover:bg-black'
              onClick={handlePrev}
            >
              <FaAngleLeft className='text-lg' />
            </button>
            <button
              className='absolute top-1/2 right-0 z-20 w-[40px] h-[40px] flex justify-center items-center text-white bg-overlayBlack hover:bg-black'
              onClick={handleNext}
            >
              <FaAngleRight className='text-lg' />
            </button>
          </div>
        </section>
        <section className='flex flex-col gap-[20px]'>
          <h3 className='text-lg font-medium'>{title}</h3>
          <div className='text-darkGray flex gap-[20px]'>
            <p>{code}</p>
            <p>Categories: {categories?.join(',')}</p>
          </div>
          <p className='text-md font-bold'>${price}</p>
          <p className='text-darkGray'>{shortDescription}</p>
          <div className='desktop:container flex flex-col gap-[20px]'>
            <div className='flex items-center gap-[40px]'>
              <h6 className='w-1/6 text-darkGray'>Size</h6>
              <select name='size' id='size'>
                <option value=''>Chose an option</option>
                {tabs?.addInformation.sizes.map((s, index) => (
                  <option key={index} value={s} className='uppercase'>
                    Size {s}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center gap-[40px]'>
              <h6 className='w-1/6 text-darkGray'>Colors</h6>
              <select name='size' id='size'>
                <option value=''>Chose an option</option>
                {tabs?.addInformation.colors.map((c, index) => (
                  <option key={index} value={c} className='uppercase'>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='desktop:container flex flex-col mobileLg:flex-row items-stretch gap-[40px]'>
            <div className='relative max-w-[135px] flex justify-between'>
              <button
                className='w-[45px] text-lg flex justify-center items-center border border-lightGray rounded-l-sm'
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                className='w-[45px] text-center text-md outline-none border border-lightGray bg-lightGray'
                type='number'
                min='1'
                value={count}
                onChange={handleChangeCount}
              />
              <button
                className='w-[45px] text-lg flex justify-center items-center border border-lightGray rounded-r-sm'
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <div>
              <button className='uppercase px-4 py-2 rounded-[24px] flex items-center gap-[10px] bg-purple hover:bg-black text-white'>
                <span>Add to Cart</span>
                <FaCartPlus />
              </button>
            </div>
          </div>
          <div className='desktop:container my-4 text-gray flex items-center gap-[20px]'>
            <button className='btn-wishlist hover:text-purple flex justify-center items-center'>
              <span>Add to Wishlist</span>
              <FaHeart />
            </button>
            <span>|</span>
            <button className='btn-facebook hover:text-purple flex justify-center items-center'>
              <span>Share to Facebook</span>
              <FaFacebookF />
            </button>
          </div>
        </section>
      </article>
    </section>
  );
};

export default ProductDetails;
