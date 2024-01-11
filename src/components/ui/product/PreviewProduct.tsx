import { FaRegHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/interfaces/interfaces';
import scrollElement from '@/services/utils/scroll-elements';
import './product.css';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { useContext } from 'react';
import { ModalContext } from '@/components/modal/hooks/modalContext';
type Props = {
  product: Product;
  refEl?: (el: HTMLElement) => HTMLElement;
  style?: React.CSSProperties;
};
function PreviewProduct({ product, refEl, style }: Props) {
  const { setVisibleModal } = useContext(ModalContext);
  const { _id, images, name, price, sale, salePrice } = product;
  const navigate = useNavigate();
  const handleLinkClick = (id: string) => {
    scrollElement();
    navigate(`/shop/${id}`);
  };
  return (
    <article
      ref={refEl}
      style={style}
      className='m-auto flex flex-col flex-shrink-0 flex-grow-1 gap-[20px]'
    >
      <div className='product-preview relative w-full overflow-hidden cursor-pointer'>
        <LazyLoadImage
          className='max-w-[290px] w-full h-[350px]'
          src={images[0]}
          alt={name}
        />
        <div className='quick-view-btn'>
          <button
            onClick={() =>
              setVisibleModal({
                visibleProductModal: product,
              })
            }
          >
            Quick View
          </button>
        </div>
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
          <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
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
