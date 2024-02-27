import { useState, useMemo, LegacyRef, useCallback } from 'react';
import { Product } from '@/interfaces/interfaces';
import { useGetReviewsQuery } from '@/services/redux/features/productFeatures';
import { useSearchParams } from 'react-router-dom';
import { FaRegStar, FaStar, FaRegStarHalfStroke } from 'react-icons/fa6';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { formatTime } from '@/services/utils/format';
import Pagination from '@/components/(ui)/pagination/Pagination';

type Props = {
  product: Product;
  refEl: LegacyRef<HTMLElement>;
};
const Description: React.FC<Props> = ({ product, refEl }) => {
  const { details } = product;
  const [tab, setTab] = useState(0);
  const [searchQuery] = useSearchParams();
  const tabpanel = ['description', 'additional information', 'reviews'];
  const { data: dataReviews, isSuccess: isSuccessReviews } = useGetReviewsQuery(
    { id: product._id, query: `page=${searchQuery.get('page') || 1}` }
  );
  const sizes = useMemo(() => details.variants.map((v) => v.size), [product]);
  const colors = useMemo(() => {
    const arrColors = details.variants.map((v) => v.color);
    return [...new Set(arrColors)];
  }, [product]);
  const renderStars = useCallback(
    (rate: number) => {
      const fullStars = Math.floor(rate);
      const decimalPart = rate - fullStars;
      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className='text-purple' />);
      }
      if (decimalPart > 0) {
        stars.push(
          <FaRegStarHalfStroke
            key={fullStars}
            className='text-purple'
            // style={{ width: `${decimalPart * 100}%`, overflow: 'hidden' }}
          />
        );
      }
      const remainingStars = 5 - Math.ceil(rate);
      for (let i = 0; i < remainingStars; i++) {
        stars.push(<FaRegStar key={fullStars + i} />);
      }

      return stars;
    },
    [dataReviews]
  );
  const renderReviews = useMemo(() => {
    return dataReviews?.reviews && isSuccessReviews
      ? dataReviews.reviews.map((r: any) => (
          <div
            key={r._id}
            className='py-4 flex items-center gap-[20px] text-darkGray border-b border-lightGray'
          >
            <LazyLoadImage
              src={r.avatar}
              alt={r.username}
              className='w-[42px] h-[42px] rounded-full'
            />
            <div className='flex-1 flex flex-col justify-between gap-[10px]'>
              <div className='flex items-center justify-between'>
                <div>
                  <p>{r.username}</p>
                  <p className='text-sm text-gray'>
                    {formatTime(r.created_at)}
                  </p>
                </div>
                <div className='flex items-center'>{renderStars(r.rate)}</div>
              </div>
              <p className='text-sm text-gray'>{r.reviews}</p>
            </div>
          </div>
        ))
      : null;
  }, [dataReviews, isSuccessReviews]);
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
            {t === 'reviews'
              ? `${t} ${dataReviews?.total ? `(${dataReviews?.total})` : ''}`
              : t}
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
        <div
          className={`tabpanel ${
            tab === 2 ? 'active' : ''
          } flex flex-col gap-[10px] py-8`}
        >
          {isSuccessReviews && dataReviews?.reviews.length !== 0 && (
            <div className='flex flex-col gap-[40px] items-start'>
              <div className='flex items-center gap-[20px]'>
                <p className='text-xl text-purple font-medium flex gap-[5px]'>
                  <span>{dataReviews?.avgRate}</span>
                  <span>/</span>
                  <span>5</span>
                </p>
                <div className='flex items-center text-lg'>
                  {renderStars(dataReviews?.avgRate)}
                </div>
              </div>
              <div className='w-full flex flex-col gap-[10px]'>
                {renderReviews}
              </div>
              {dataReviews?.totalPage > 1 && (
                <Pagination totalPage={dataReviews?.totalPage as number} />
              )}
            </div>
          )}
          {isSuccessReviews && !dataReviews?.total && (
            <p className='text-xl font-bold text-darkGray text-center'>
              No Reviews Yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Description;
