import { LegacyRef, useMemo } from 'react';
import { Product } from '@/interfaces/interfaces';
import { useSlider } from '@/hooks/useSlider';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
type Props = {
  product: Product;
  refEl: LegacyRef<HTMLElement>;
};
const Images: React.FC<Props> = ({ product, refEl }) => {
  const { name, images } = product;
  const { indexImage, handlePrev, handleNext, handleIndex } = useSlider(
    images.length
  );
  const renderListImage = useMemo(
    () =>
      images.map((image, index) => {
        return (
          <img
            key={index}
            className='object-cover'
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
  const wrapImages = useMemo(
    () =>
      images.map((image, index) => {
        return (
          <img
            key={index}
            className='max-w-[70px] w-[70px] h-[84px] cursor-pointer'
            src={image}
            alt={`${name} ${index}`}
            style={{
              border: `${indexImage === index ? '1px solid #ccc' : ''}`,
            }}
            onClick={() => handleIndex(index)}
          />
        );
      }),
    [indexImage, images]
  );
  return (
    <section
      ref={refEl}
      className='w-full laptop:w-1/2 flex flex-col mobileLg:flex-row gap-[20px]'
    >
      <div className='flex flex-row mobileLg:flex-col justify-between mobileLg:justify-start mobileLg:gap-[40px]'>
        {wrapImages}
      </div>
      <div className='relative max-w-[514px] max-h-[634px] overflow-hidden flex'>
        {renderListImage}
        {images.length > 1 ? (
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
    </section>
  );
};

export default Images;
