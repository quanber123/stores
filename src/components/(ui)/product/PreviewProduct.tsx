import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/interfaces/interfaces';
import scrollElement from '@/services/utils/scroll-elements';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { useCallback, useContext, useMemo } from 'react';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useSelector } from 'react-redux';
import { accessToken, getAllFavorites } from '@/services/redux/slice/authSlice';
import { usePostFavoritesMutation } from '@/services/redux/features/productFeatures';
type Props = {
  product: Product;
  refEl?: (el: HTMLElement) => HTMLElement;
  style?: React.CSSProperties;
};
function PreviewProduct({ product, refEl, style }: Props) {
  const token = useSelector(accessToken);
  const { setVisibleModal } = useContext(ModalContext);
  const { _id, images, name, price, sale, salePrice } = product;
  const favorites = useSelector(getAllFavorites);
  const [postFavorite] = usePostFavoritesMutation();
  const loveProduct = useMemo(() => {
    return (
      favorites?.favorite?.products?.find((item: any) => item._id === _id) ||
      null
    );
  }, [favorites.favorite?.products]);
  const navigate = useNavigate();
  const handleLinkClick = (id: string) => {
    scrollElement();
    navigate(`/shop/${id}`);
  };
  const handlePostFavorite = useCallback(() => {
    if (token) {
      postFavorite({ token: token, productId: product._id });
    } else {
      setVisibleModal('visibleLoginModal');
    }
  }, [postFavorite]);
  return (
    <article
      ref={refEl}
      style={style}
      className='m-auto flex flex-col flex-shrink-0 flex-grow-1 gap-[20px]'
    >
      <div className='relative w-full overflow-hidden cursor-pointer'>
        <LazyLoadImage
          style={{ transition: 'all 0.2s linear' }}
          className='max-w-[290px] w-full h-[350px] hover:scale-110'
          src={images[0]}
          alt={name}
        />
        {sale?.rate && sale?.active ? (
          <p className='absolute top-0 right-0 px-2 py-1 z-50 bg-purple text-white'>
            -{sale?.rate}%
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className='flex flex-col gap-[5px]'>
        <div className='flex justify-between items-center text-mediumGray font-bold'>
          <h6
            className='cursor-pointer capitalize'
            onClick={() => handleLinkClick(_id)}
          >
            {name}
          </h6>
          {loveProduct ? (
            <FaHeart
              className='cursor-pointer text-purple'
              onClick={handlePostFavorite}
            />
          ) : (
            <FaRegHeart
              className='cursor-pointer hover:text-purple transition-colors'
              onClick={handlePostFavorite}
            />
          )}
        </div>
        <p className='flex items-center gap-[20px]'>
          <span
            className={`${
              sale?.rate && sale?.active ? 'text-red line-through' : ''
            }`}
          >
            ${price}
          </span>{' '}
          <span
            className={`${
              sale?.rate && sale?.active ? 'block text-sm font-bold' : 'hidden'
            }`}
          >
            ${salePrice}
          </span>
        </p>
      </div>
    </article>
  );
}

export default PreviewProduct;
