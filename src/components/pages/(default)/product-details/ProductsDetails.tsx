import React, {
  useState,
  useCallback,
  ChangeEvent,
  LegacyRef,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { FaCartPlus, FaHeart, FaFacebookF, FaFaceDizzy } from 'react-icons/fa6';
import { Product } from '@/interfaces/interfaces';
import {
  useCreateCartMutation,
  useGetFavoriteByProductQuery,
  usePostFavoritesMutation,
} from '@/services/redux/features/productFeatures';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useSelector } from 'react-redux';
import { accessToken, getAllFavorites } from '@/services/redux/slice/authSlice';
import { FacebookShareButton } from 'react-share';
import { useLocation } from 'react-router-dom';
type Props = {
  product: Product;
  refEl: LegacyRef<HTMLElement>;
};
const ProductDetails: React.FC<Props> = ({ product, refEl }) => {
  const location = useLocation();
  const client_url = import.meta.env.VITE_CLIENT_URL;
  const token = useSelector(accessToken);
  const [
    createCart,
    { isSuccess: isSuccessCreate, isLoading: isLoadingCreate },
  ] = useCreateCartMutation();
  const { data: dataFavorite, isSuccess: isSuccessFavorite } =
    useGetFavoriteByProductQuery(product._id);
  const favorites = useSelector(getAllFavorites);
  const likedFavorites = useMemo(() => {
    return (
      favorites.favorite?.products?.find((p) => p._id === product._id) || null
    );
  }, [product._id, favorites.favorite]);
  const [postFavorite] = usePostFavoritesMutation();
  const { setVisibleModal, closeAllModal } = useContext(ModalContext);
  const { _id, name, price, salePrice, finalPrice, images, details } = product;
  const [count, setCount] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const renderedTags = useMemo(() => {
    if (!details?.tags?.length) {
      return '';
    }
    const hashtags = details?.tags?.map((t) => {
      return `#${t.name}`;
    });
    return hashtags.join(' ');
  }, [details]);
  //cache total quantity of product
  const totalQuantity = useMemo(
    () =>
      details.variants
        .filter((v) => v.inStock)
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        ),
    [product, refEl]
  );

  // cache sizes and remove duplicated sizes
  const sizes = useMemo(() => {
    const arrSizes = details.variants.map((v) => v.size).filter((v) => v);
    return [...new Set(arrSizes)];
  }, [product, refEl]);
  const isStock = useMemo(() => {
    const variant = details.variants.find(
      (v) => v.size === selectedSize && v.color
    );
    return variant || null;
  }, [details.variants, selectedSize]);
  const filteredColors = useMemo(
    () =>
      details.variants
        .filter((v) => v.size === selectedSize)
        .map((v) => {
          return (
            <option key={v.color} value={v.color}>
              {v.color.toUpperCase()}
            </option>
          );
        }) ?? [],
    [selectedSize]
  );
  const getQuantity = useMemo(
    () =>
      details.variants.find(
        (v) => v.size === selectedSize && v.color === selectedColor
      ) ?? null,
    [selectedSize, selectedColor]
  );
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
    if (token) {
      const cart = {
        id: _id,
        name: name,
        image: images[0],
        size: selectedSize,
        color: selectedColor,
        price: price,
        amountSalePrice: salePrice > 0 ? price - salePrice : 0,
        salePrice: salePrice,
        finalPrice: finalPrice,
        quantity: count,
        totalPrice: finalPrice * count,
      };
      createCart({ token, cart });
    } else {
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: 'Failed: You need to be logged in!',
        },
      });
    }
  }, [selectedColor, selectedSize, count]);
  if (isLoadingCreate) {
    <LoadingV2 />;
  }
  useEffect(() => {
    if (isSuccessCreate) {
      closeAllModal();
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: 'Success: Added Product!',
        },
      });
    }
  }, [isSuccessCreate]);
  return (
    <section
      className='w-full laptop:w-1/2 flex flex-col gap-[20px]'
      ref={refEl}
    >
      <h3 className='text-lg font-medium capitalize'>{name}</h3>
      <div className='text-darkGray flex gap-[20px]'>
        <p>Category: {details.category.name}</p>
      </div>
      <p className='text-md font-bold'>${price}</p>
      <p className='text-darkGray'>{details.shortDescription}</p>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex items-center gap-[40px]'>
          <label htmlFor='sizes' className='w-1/6 text-darkGray'>
            Sizes
          </label>
          <select name='sizeProduct' id='sizes' onChange={handleSelectSize}>
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
          <select name='colorProduct' id='colors' onChange={handleSelectColor}>
            <option value=''>
              Chose an option{' '}
              {filteredColors.length > 0 ? '' : '(Please chose size first)'}
            </option>
            {filteredColors.length > 0 ? (
              filteredColors
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
            <span>{getQuantity.quantity > 1 ? 'products' : 'product'}</span>)
          </p>
        ) : (
          <></>
        )}
        {selectedColor && selectedColor && !isStock?.inStock ? (
          <p className='text-md font-medium'>(This item is out of stock)</p>
        ) : (
          <></>
        )}
      </div>
      <div>
        <p className='text-sm text-darkGray font-bold'>
          You can only add products when you have selected the size and color
          and the item is available
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
            disabled={
              !selectedSize || !isStock?.inStock || isLoadingCreate
                ? true
                : false
            }
            onClick={handleAddToCart}
          >
            {selectedSize && selectedColor && isStock?.inStock ? (
              <>
                <span>Add to Cart</span>
                <FaCartPlus />
              </>
            ) : (
              <>
                <span>Add to Cart</span>
                <FaFaceDizzy />
              </>
            )}
          </button>
        </div>
        <div className='flex justify-center desktop:justify-start items-center gap-[20px] text-md'>
          <button
            className={`btn-wishlist hover:text-purple flex justify-center items-center gap-[10px] ${
              likedFavorites ? 'text-purple' : 'text-gray'
            }`}
            onClick={() =>
              postFavorite({ token: token, productId: product._id })
            }
          >
            <FaHeart />
            {isSuccessFavorite && <p>Liked ({dataFavorite})</p>}
          </button>
          <span>|</span>
          <div className='flex items-center gap-[10px]'>
            <p>Share:</p>
            <FacebookShareButton
              url={`${client_url}${location.pathname}`}
              hashtag={renderedTags}
              className='btn-facebook hover:text-purple flex justify-center items-center'
            >
              <FaFacebookF />
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
