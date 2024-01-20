import React from 'react';
import { capitalizeFirstLetter, formatDate } from '@/services/utils/format';
import { FaRegClock, FaRegEye, FaQuoteRight } from 'react-icons/fa6';

import { Blog } from '@/interfaces/interfaces';
type Props = {
  blogDetails: Blog;
};
const BlogDetails: React.FC<Props> = ({ blogDetails }) => {
  return (
    <section className='container mt-8 target:mt-0 flex flex-col gap-[20px]'>
      <div className='bg-darkGray absolute top-0 left-0 w-full h-[250px] tablet:h-[450px] -z-10'></div>
      <img
        className='w-full desktop:h-[600px] object-fill'
        src={blogDetails?.imgSrc}
        alt={blogDetails?.title}
      />
      <div className='flex flex-col tablet:flex-row tablet:items-center gap-[10px] text-sm'>
        <p>
          By{' '}
          <span className='font-bold'>
            {blogDetails?.author
              ? capitalizeFirstLetter(blogDetails.author)
              : ''}
          </span>
        </p>
        <span className='hidden tablet:block'>|</span>
        <div className='flex items-center gap-[5px]'>
          <FaRegClock />
          <p>{formatDate(blogDetails?.created_at)}</p>
        </div>
        <span className='hidden tablet:block'>|</span>
        <div className='flex items-center gap-[5px]'>
          <FaRegEye />
          {blogDetails?.views ? (
            <p>
              {blogDetails.views > 1
                ? `${blogDetails.views} views`
                : `${blogDetails.views} view`}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='flex flex-col gap-[20px] text-semiBoldGray'>
        <h1 className='text-[20px] tablet:text-2xl text-darkGray font-bold'>
          {blogDetails?.title}
        </h1>
        <p>{blogDetails?.open_paragraph}</p>
        {blogDetails?.quotes ? (
          <div className='relative bg-bgGray min-h-[250px] my-4 p-8 rounded-[8px] flex justify-center items-center'>
            <q className='font-bold text-md tablet:text-[20px]'>
              {blogDetails.quotes}
            </q>
            <FaQuoteRight className='hidden tablet:block absolute top-0 right-[10%] text-gray text-[246px] opacity-30' />
          </div>
        ) : (
          <></>
        )}
        <p>{blogDetails?.body_paragraph}</p>
        <p>{blogDetails?.close_paragraph}</p>
      </div>
    </section>
  );
};

export default BlogDetails;
