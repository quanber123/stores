import { FaRegHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/interfaces/interfaces';
import scrollElement from '@/utils/scroll-elements';
import './product.css';
import LazyLoadImage from '@/utils/lazyload-image';
import { useDispatch } from 'react-redux';
import { setQuickViewProduct } from '@/store/slice/productSlice';
type Props = {
  product: Product;
  refEl?: (el: HTMLElement) => HTMLElement;
  style?: React.CSSProperties;
};
function PreviewProduct({ product, refEl, style }: Props) {
  const dispatch = useDispatch();
  const { _id, images, name, price } = product;
  const navigate = useNavigate();
  const handleLinkClick = (id: string) => {
    scrollElement();
    navigate(`/shop/${id}`);
  };
  return (
    <article
      ref={refEl}
      style={style}
      className='m-auto flex flex-col flex-shrink-0 flex-grow-0 gap-[20px]'
    >
      <div className='product-preview relative w-full overflow-hidden cursor-pointer'>
        <LazyLoadImage
          className='max-w-[290px] w-full h-[350px]'
          src={images[0]}
          alt={name}
        />
        <div className='quick-view-btn'>
          <button onClick={() => dispatch(setQuickViewProduct(product))}>
            Quick View
          </button>
        </div>
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
        <p>${price}</p>
      </div>
    </article>
  );
}

export default PreviewProduct;
