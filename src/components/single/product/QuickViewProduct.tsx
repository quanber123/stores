import React, { useState, useCallback, ChangeEvent } from 'react';
import Slider from '@/utils/slider';
import {
  FaAngleRight,
  FaAngleLeft,
  FaCartPlus,
  FaHeart,
  FaFacebookF,
  FaXmark,
} from '@/assets/icons/index';
import LazyLoadImage from '@/utils/lazyload-image';
import { Product } from '@/interfaces/interfaces';
type Props = {
  product: Product;
  status: number | string | null;
  closeModal: () => void;
};
const QuickViewProduct: React.FC<Props> = ({ product, status, closeModal }) => {
  const [count, setCount] = useState<number>(1);
  const { indexImage, handlePrev, handleNext, handleIndex } = Slider(
    product.images?.length
  );
  const renderList = product.images?.map((image, index) => {
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
  const wrapImages = product.images?.map((image, index) => {
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
    <article
      className={`quick-view-product ${
        status ? 'active' : ''
      } overflow-y-auto laptop:overflow-hidden`}
    >
      <div className='container flex flex-col gap-[10px]'>
        <button
          className='ml-auto text-xl text-semiBoldGray'
          onClick={closeModal}
        >
          <FaXmark />
        </button>
        <div className='flex flex-col laptop:flex-row justify-between gap-[40px]'>
          <div className='flex flex-col mobileLg:flex-row gap-[40px]'>
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
          </div>
          <div className='flex flex-col gap-[20px]'>
            <h3 className='text-lg font-medium'>{product.title}</h3>
            <div className='text-darkGray flex gap-[20px]'>
              <p>{product.code}</p>
              <p>Categories: {product.categories?.join(',')}</p>
            </div>
            <p className='text-md font-bold'>${product.price}</p>
            <p className='text-darkGray'>{product.shortDescription}</p>
            <div className='desktop:container flex flex-col gap-[20px]'>
              <div className='flex items-center gap-[40px]'>
                <h6 className='w-1/6 text-darkGray'>Size</h6>
                <select name='size' id='size'>
                  <option value=''>Chose an option</option>
                  {product.tabs?.addInformation.sizes.map((s, index) => (
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
                  {product.tabs?.addInformation.colors.map((c, index) => (
                    <option key={index} value={c} className='uppercase'>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='desktop:container flex flex-col mobileLg:flex-row items-center desktop:items-stretch gap-[40px]'>
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
            <div className='desktop:container my-4 text-gray flex justify-center desktop:justify-start items-center gap-[20px]'>
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
          </div>
        </div>
      </div>
    </article>
  );
};

export default QuickViewProduct;
