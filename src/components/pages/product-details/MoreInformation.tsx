import { useState, LegacyRef } from 'react';
import './product-details.css';
import { Product } from '@/interfaces/interfaces';
type Props = {
  tabs: Product['tabs'];
  refEl: LegacyRef<HTMLElement>;
};
const MoreInformationProduct: React.FC<Props> = ({ tabs, refEl }) => {
  const [tab, setTab] = useState(0);
  const tabpanel = ['description', 'additional information', 'reviews (1)'];
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
          <p>{tabs?.description}</p>
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
            <span className='w-1/2'>{tabs?.addInformation.weight}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>
              Dimensions
            </span>
            <span className='w-1/2'>{tabs?.addInformation.dimensions}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>
              Materials
            </span>
            <span className='w-1/2'>{tabs?.addInformation.materials}</span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>Color</span>
            <span className='w-1/2 capitalize'>
              {tabs?.addInformation.colors.join(',')}
            </span>
          </p>
          <p className='flex justify-center gap-[20px]'>
            <span className='w-1/2 max-w-[145px] text-semiBoldGray'>Size</span>
            <span className='w-1/2 uppercase'>
              {tabs?.addInformation.sizes.join(',')}
            </span>
          </p>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default MoreInformationProduct;
