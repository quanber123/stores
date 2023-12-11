import React from 'react';

const LoadingProduct = React.memo(() => {
  const loadingItems = [];
  for (let i = 0; i < 8; i++) {
    loadingItems.push(
      <article
        key={i}
        className='m-auto max-w-[250px] w-full flex flex-col gap-[20px]'
      >
        <div className='skeleton max-w-[290px] w-full h-[350px]'></div>
        <div className='w-full flex flex-col gap-[5px]'>
          <div className='w-full flex justify-between items-center'>
            <div className='skeleton w-[140px] h-[24px]'></div>
            <div className='skeleton w-[24px] h-[24px]'></div>
          </div>
          <div className='skeleton w-[42px] h-[24px]'></div>
        </div>
      </article>
    );
  }
  return <>{loadingItems}</>;
});

export default LoadingProduct;
