import { useState } from 'react';
import { FaRegHeart } from '@/assets/icons/index';
type propsProduct = {
  style?: React.CSSProperties | undefined;
  srcImg: string;
  altImg?: string;
  refEl: (el: HTMLElement | null) => void;
  nameProduct: string;
  priceProduct: number;
};
function PreviewProduct({
  style,
  srcImg,
  altImg,
  refEl,
  nameProduct,
  priceProduct,
}: propsProduct) {
  const [hoverProduct, setHoverProduct] = useState(false);
  return (
    <article
      ref={(el) => refEl?.(el)}
      className='relative max-w-[315px] flex flex-col gap-[15px]'
      style={style ? style : undefined}
    >
      <div
        className='product-preview relative overflow-hidden cursor-pointer'
        onMouseEnter={() => setHoverProduct(true)}
        onMouseLeave={() => setHoverProduct(false)}
      >
        <img className='max-h-[390px]' src={srcImg} alt={altImg} />
        <div
          style={{
            transform: hoverProduct ? 'translateY(0)' : 'translateY(60px)',
            opacity: hoverProduct ? '1' : '0',
            transition: 'all 0.2s linear',
          }}
        >
          <button
            className='absolute z-10 px-4 py-2 bg-white text-darkGray hover:bg-[#000] hover:text-white'
            style={{
              bottom: '16px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '23px',
              transition: 'all 0.3s linear',
            }}
          >
            Quick View
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-[5px]'>
        <div className='flex justify-between items-center text-gray font-medium'>
          <h5 className='cursor-pointer'>{nameProduct}</h5>
          <FaRegHeart className='cursor-pointer hover:text-purple transition-colors' />
        </div>
        <p>${priceProduct}</p>
      </div>
    </article>
  );
}

export default PreviewProduct;
