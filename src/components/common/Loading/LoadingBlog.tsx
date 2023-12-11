import React from 'react';

const LoadingBlog = React.memo(() => {
  const loadingItems = [];
  for (let i = 0; i < 8; i++) {
    loadingItems.push(
      <article className='relative flex flex-col gap-[10px] tablet:gap-[20px]'>
        <div className='w-full overflow-hidden'>
          <div className='skeleton w-full h-[210px] tablet:h-[384px] flex-shrink-0 flex-grow-0'></div>
        </div>
        <div className='skeleton w-[112px] h-[24px] absolute top-4 left-4'></div>
        <div className='flex flex-col gap-[10px]'>
          <div className='skeleton w-full h-[42px]'> </div>
          <div className='skeleton w-full h-[48px]'></div>
          <div className='block laptop:flex justify-between items-center'>
            <div className='flex flex-col tablet:flex-row tablet:items-center gap-[10px]'>
              <span className='skeleton w-[56px] h-[21px]'></span>
              <span className='skeleton w-[56px] h-[21px]'></span>
              <span className='skeleton w-[56px] h-[21px]'></span>
            </div>
            <div className='skeleton w-[160px] h-[24px] my-4 laptop:my-0'></div>
          </div>
        </div>
      </article>
    );
  }
  return <>{loadingItems}</>;
});
export default LoadingBlog;
