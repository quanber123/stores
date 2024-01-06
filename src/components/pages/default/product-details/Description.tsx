import { useState, useMemo, LegacyRef } from 'react';
import { Product } from '@/interfaces/interfaces';
type Props = {
  product: Product;
  refEl: LegacyRef<HTMLElement>;
};
const Description: React.FC<Props> = ({ product, refEl }) => {
  const { details } = product;
  const [tab, setTab] = useState(0);
  const tabpanel = ['description', 'additional information', 'reviews (1)'];
  const sizes = useMemo(() => details.variants.map((v) => v.size), [product]);
  const colors = useMemo(() => {
    const arrColors = details.variants.map((v) => v.color);
    return [...new Set(arrColors)];
  }, [product]);
  return (
    <section
      className='container border border-lightGray text-darkGray px-4 tablet:px-16 laptop:px-32 py-8 laptop:py-16 flex flex-col items-start tablet:items-center gap-[40px]'
      ref={refEl}
    >
      <ul className='flex flex-col mobileLg:flex-row gap-[20px]'>
        {tabpanel.map((t, index) => (
          <li
            key={index}
            className={`${
              tab === index ? 'active' : ''
            } tab cursor-pointer capitalize`}
            onClick={() => setTab(index)}
          >
            {t}
          </li>
        ))}
      </ul>
      <div className='w-full'>
        <div className={`tabpanel ${tab === 0 ? 'active' : ''}`}>
          <p>{details?.description}</p>
        </div>
        <div
          className={`tabpanel ${
            tab === 1 ? 'active' : ''
          } flex flex-col gap-[10px]`}
        >
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>
              Weight
            </span>
            <span className='w-1/2'>{details?.weight}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>
              Dimensions
            </span>
            <span className='w-1/2'>{details?.dimensions}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>
              Materials
            </span>
            <span className='w-1/2'>{details?.materials}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>Color</span>
            <span className='w-1/2 capitalize'>{colors.join(', ')}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>Size</span>
            <span className='w-1/2 uppercase'>{sizes.join(', ')}</span>
          </p>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Description;
