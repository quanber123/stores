import React from 'react';
type Props = {
  style: React.CSSProperties;
};
const LoadingBlogHome = React.memo(({ style }: Props) => {
  const loadingItems = [];
  for (let i = 0; i < 8; i++) {
    loadingItems.push(
      <article
        className='flex flex-col gap-[15px] flex-shrink-0 flex-grow-0'
        style={style}
      >
        <div className='skeleton w-full max-h-[240px] h-[240px]'></div>
        <div className='flex flex-col gap-[5px]'>
          <div className='skeleton w-1/2 h-[21px]'></div>
          <div className='skeleton w-full h-[54px]'></div>
          <div className='skeleton w-full h-[48px]'></div>
        </div>
      </article>
    );
  }
  return <>{loadingItems}</>;
});
export default LoadingBlogHome;
