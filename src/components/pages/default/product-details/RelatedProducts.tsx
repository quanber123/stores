import { useMemo, LegacyRef } from 'react';
import PreviewProduct from '@/components/ui/product/PreviewProduct';
import { Product } from '@/interfaces/interfaces';
import { useCarousel } from '@/hooks/useCarousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
type Props = {
  products: Array<Product>;
  refEl: LegacyRef<HTMLElement>;
};
const RelatedProducts: React.FC<Props> = ({ products, refEl }) => {
  const { width, indexSlider, breakpoints, handlePrev, handleNext } =
    useCarousel(products.length);
  const renderedProducts = useMemo(
    () =>
      products.map((p, index) => (
        <PreviewProduct
          style={{ width: `calc(${width}% - 20px)` }}
          key={index}
          product={p}
        />
      )),
    [products, width]
  );
  return (
    <section
      ref={refEl}
      className={`relative w-full h-full flex flex-col justify-center items-center gap-[20px] overflow-hidden`}
    >
      <h2 className='text-xl tablet:text-4xl text-darkGray font-bold'>
        Related Products
      </h2>
      <div className='container relative mt-4'>
        <div className={`max-w-[${width * breakpoints}%] overflow-hidden`}>
          <div
            className='w-full flex items-stretch gap-[20px]'
            style={{
              transform: `translateX(-${indexSlider * width}%)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {renderedProducts}
          </div>
        </div>
        {products.length > breakpoints ? (
          <>
            <div className='text-xl'>
              <FaAngleLeft
                className='absolute z-50 top-1/2 -left-[1%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
                onClick={handlePrev}
              />
              <FaAngleRight
                className='absolute z-50 top-1/2 -right-[1%] cursor-pointer text-gray hover:text-semiBoldGray transition-colors'
                onClick={handleNext}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
