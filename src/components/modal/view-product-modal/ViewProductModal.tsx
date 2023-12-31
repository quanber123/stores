import { useState, useCallback, ChangeEvent, useMemo, useRef } from 'react';
import {
  FaAngleRight,
  FaAngleLeft,
  FaCartPlus,
  FaHeart,
  FaFacebookF,
  FaXmark,
  FaFaceDizzy,
} from 'react-icons/fa6';
import { useSlider } from '@/hooks/useSlider';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/services/redux/slice/cartSlice';
import { setVisibleAlertModal } from '@/services/redux/slice/modalSlice';
import {
  closeQuickViewProduct,
  getQuickViewProduct,
} from '@/services/redux/slice/productSlice';
import { Product } from '@/interfaces/interfaces';
import Modal from '@/Modal';
const ViewProductModal = () => {
  const dispatch = useDispatch();
  const visibleModal = useSelector(getQuickViewProduct);
  const modalRef = useRef<HTMLElement | null>(null);
  const { _id, name, price, images, details } =
    visibleModal.productModal as Product;
  const [count, setCount] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const { indexImage, handlePrev, handleNext, handleIndex } = useSlider(
    images?.length
  );
  const renderListImage = useMemo(
    () =>
      images?.map((image, index) => {
        return (
          <img
            key={index}
            className='w-[268px] h-[332px] tablet:w-[434px] tablet:h-[538px] object-cover'
            src={image}
            alt={`${name} ${index}`}
            style={{
              transform: `translateX(${-100 * indexImage}%)`,
              transition: 'all 0.3s ease-in-out',
            }}
          />
        );
      }),
    [images, indexImage]
  );
  const wrapImages = useMemo(() => {
    return images?.map((image, index) => {
      return (
        <div
          className='max-w-[70px] w-[70px] h-[84px]'
          key={index}
          onClick={() => handleIndex(index)}
        >
          <img
            src={image}
            className='w-[70px] h-[84px] cursor-pointer'
            alt={image}
            style={{
              border: `${indexImage === index ? '1px solid #ccc' : ''}`,
            }}
          />
        </div>
      );
    });
  }, [images, indexImage]);
  const totalQuantity = useMemo(
    () =>
      details?.variants?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      ),
    [details]
  );
  const sizes = useMemo(() => {
    const arrSizes = details.variants.map((v) => v.size).filter((v) => v);
    return [...new Set(arrSizes)];
  }, [visibleModal?.productModal]);
  const filteredColors = useMemo(
    () =>
      details?.variants
        ?.filter((v) => v.size === selectedSize)
        .map((v) => {
          return {
            color: v.color,
            quantity: v.quantity,
          };
        }) ?? [],
    [selectedSize]
  );
  const getQuantity = useMemo(
    () =>
      details?.variants?.find(
        (v) => v.size === selectedSize && v.color === selectedColor
      ) ?? null,
    [selectedSize, selectedColor]
  );
  const isStock = useMemo(() => {
    const variant = details.variants.find(
      (v) => v.size === selectedSize && v.color
    );
    return variant || null;
  }, [details.variants, selectedSize]);
  const handleSelectSize = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedColor('');
      setSelectedSize(e.target.value);
    },
    [selectedSize]
  );
  const handleSelectColor = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedColor(e.target.value);
    },
    [selectedColor]
  );
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
  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        _id: _id,
        name: name,
        image: images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: count,
        price: price,
        totalPrice: count * price,
      })
    );
    dispatch(closeQuickViewProduct());
    dispatch(
      setVisibleAlertModal({
        status: 'success',
        message: 'Success: Added Product!',
        color: 'green',
        backgroundColor: 'lightGreen',
      })
    );
  }, [dispatch]);
  const clickOutsideModal = useCallback((e: React.MouseEvent) => {
    const dialogDemission = modalRef.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDemission!.left ||
      e.clientX > dialogDemission!.right ||
      e.clientY < dialogDemission!.top ||
      e.clientY > dialogDemission!.bottom
    ) {
      dispatch(closeQuickViewProduct());
    }
  }, []);
  return (
    <Modal>
      <section
        className={`quick-view-product ${
          visibleModal.statusModal ? 'active' : ''
        } overflow-y-auto laptop:overflow-hidden`}
        onClick={clickOutsideModal}
      >
        <article ref={modalRef} className='container flex flex-col gap-[10px]'>
          <button
            className='ml-auto text-xl text-white'
            onClick={() => dispatch(closeQuickViewProduct())}
            aria-label='CloseModal'
          >
            <FaXmark />
          </button>
          <div className='flex flex-col laptop:flex-row gap-[80px]'>
            <div className='w-full laptop:w-1/2 flex flex-col mobileLg:flex-row gap-[40px]'>
              <div className='flex flex-row mobileLg:flex-col justify-between mobileLg:justify-start mobileLg:gap-[40px]'>
                {wrapImages}
              </div>
              <div className='relative max-w-[514px] max-h-[634px] overflow-hidden flex'>
                {renderListImage}
                {images?.length > 1 ? (
                  <>
                    <button
                      className='absolute top-1/2 left-0 z-20 w-[40px] h-[40px] flex justify-center items-center text-white bg-overlayBlack hover:bg-black'
                      onClick={handlePrev}
                      aria-label='Previous'
                    >
                      <FaAngleLeft className='text-lg' />
                    </button>
                    <button
                      className='absolute top-1/2 right-0 z-20 w-[40px] h-[40px] flex justify-center items-center text-white bg-overlayBlack hover:bg-black'
                      onClick={handleNext}
                      aria-label='Next'
                    >
                      <FaAngleRight className='text-lg' />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className='w-full laptop:w-1/2 flex flex-col gap-[20px]'>
              <h3 className='text-lg font-medium capitalize'>{name}</h3>
              <div className='text-darkGray flex gap-[20px]'>
                <p>Category: {details?.category?.name}</p>
              </div>
              <p className='text-md font-bold'>${price}</p>
              <p className='text-darkGray'>{details?.shortDescription}</p>
              <div className='flex flex-col gap-[20px]'>
                <div className='flex items-center gap-[40px]'>
                  <label htmlFor='sizes' className='w-1/6 text-darkGray'>
                    Sizes
                  </label>
                  <select
                    name='sizeProduct'
                    id='sizes'
                    onChange={handleSelectSize}
                  >
                    <option value=''>Chose an option</option>
                    {sizes.map((s, index) => (
                      <option key={index} value={s} className='uppercase'>
                        Size {s.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex items-center gap-[40px]'>
                  <label htmlFor='colors' className='w-1/6 text-darkGray'>
                    Colors
                  </label>
                  <select
                    name='colorProduct'
                    id='colors'
                    onChange={handleSelectColor}
                  >
                    <option value={''}>
                      Chose an option{' '}
                      {filteredColors.length > 0
                        ? ''
                        : '(Please chose size first)'}
                    </option>
                    {filteredColors.length > 0 ? (
                      filteredColors.map((c, index) => (
                        <option key={index} value={c.color}>
                          {c.color.toUpperCase()}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        No colors available for the selected size.
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className='flex flex-col mobileLg:flex-row items-center gap-[40px]'>
                <div className='relative max-w-[135px] flex justify-between'>
                  <button
                    className='w-[45px] text-lg flex justify-center items-center border border-lightGray rounded-l-sm'
                    onClick={handleDecrease}
                    aria-label='Decrease'
                  >
                    -
                  </button>
                  <input
                    className='w-[45px] text-center text-md outline-none border border-lightGray bg-lightGray'
                    type='number'
                    min='1'
                    max={totalQuantity}
                    value={count}
                    onChange={handleChangeCount}
                    aria-label='Number'
                  />
                  <button
                    className='w-[45px] text-lg flex justify-center items-center border border-lightGray rounded-r-sm'
                    onClick={handleIncrease}
                    aria-label='Increase'
                  >
                    +
                  </button>
                </div>
                {getQuantity?.quantity && isStock?.inStock ? (
                  <p className='flex gap-[5px] text-md font-medium'>
                    ( <span>{getQuantity.quantity}</span>
                    <span>available</span>
                    <span>
                      {getQuantity.quantity > 1 ? 'products' : 'product'}
                    </span>
                    )
                  </p>
                ) : (
                  <></>
                )}
                {selectedColor && selectedColor && !isStock?.inStock ? (
                  <p className='text-md font-medium'>
                    (This item is out of stock)
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <p className='text-sm text-darkGray font-bold'>
                  You can only add products when you have selected the size and
                  color and the item is available
                </p>
              </div>
              <div className='text-gray flex flex-col tablet:flex-row items-center gap-[20px] tablet:gap-[80px]'>
                <div>
                  <button
                    className={`uppercase px-6 py-3 rounded-full flex items-center gap-[10px] text-white ${
                      selectedSize && selectedColor && isStock?.inStock
                        ? 'bg-purple hover:bg-black'
                        : ' bg-semiBoldGray'
                    }`}
                    disabled={selectedSize ? false : true}
                    onClick={handleAddToCart}
                  >
                    {selectedSize && selectedColor && isStock?.inStock ? (
                      <>
                        <span>Add to Cart</span>
                        <FaCartPlus />
                      </>
                    ) : (
                      <>
                        <span>Disabled</span>
                        <FaFaceDizzy />
                      </>
                    )}
                  </button>
                </div>
                <div className='flex justify-center desktop:justify-start items-center gap-[20px]'>
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
      </section>
    </Modal>
  );
};

export default ViewProductModal;
