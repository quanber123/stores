import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/interfaces/interfaces';
import scrollElement from '@/utils/scroll-elements';
import './product.css';
import QuickViewProduct from './QuickViewProduct';
type Props = {
  product: Product;
  refEl?: (el: HTMLElement) => HTMLElement;
};
function PreviewProduct({ product, refEl }: Props) {
  const { _id, images, name, price } = product;
  const [openQuickView, setOpenQuickView] = useState<number | string | null>(
    null
  );
  const navigate = useNavigate();
  const handleLinkClick = (id: string) => {
    scrollElement();
    navigate(`/shop/${id}`);
  };
  return (
    <>
      <article ref={refEl} className='max-w-[290px] flex flex-col gap-[20px]'>
        <div className='product-preview relative w-full overflow-hidden cursor-pointer'>
          <img
            className='max-w-[290px] w-full h-[350px]'
            src={images[0]}
            alt={name}
          />
          <div className='quick-view-btn'>
            <button onClick={() => setOpenQuickView(_id)}>Quick View</button>
          </div>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <div className='flex justify-between items-center text-gray font-medium'>
            <h5
              className='cursor-pointer capitalize'
              onClick={() => handleLinkClick(_id)}
            >
              {name}
            </h5>
            <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
          </div>
          <p>${price}</p>
        </div>
      </article>
      <QuickViewProduct
        product={product}
        status={openQuickView}
        closeModal={() => setOpenQuickView(null)}
      />
    </>
  );
}

export default PreviewProduct;
