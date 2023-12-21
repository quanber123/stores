function LoadingBlogDetail() {
  return (
    <section className='container mt-16 tablet:mt-32 flex flex-col gap-[20px]'>
      <div className='skeleton bg-darkGray absolute top-0 left-0 w-full h-[250px] tablet:h-[450px] -z-10'></div>
      <div className='skeleton w-full h-[250px] tablet:h-[600px]'></div>
      <div className='skeleton h-[21px]'></div>
      <div className='flex flex-col gap-[20px] text-semiBoldGray'>
        <div className='skeleton h-[64px]'></div>
        <div className='skeleton h-[72px]'></div>
        <div className='skeleton h-[250px]'></div>
        <div className='skeleton h-[72px]'></div>
        <div className='skeleton h-[72px]'></div>
      </div>
      <div className='mt-4 flex flex-col gap-[30px]'>
        <div className='flex justify-between items-center gap-[20px] py-4 border-t border-b border-gray'>
          <div className='skeleton w-[114px] h-[24px]'></div>
          <div className='skeleton w-[86px] h-[24px]'></div>
        </div>
      </div>
      <div className='pr-4 flex flex-col gap-[20px] max-h-[50vh] overflow-y-scroll'>
        <div className='flex items-start gap-[20px]'>
          <div className='skeleton w-[32px] h-[32px] rounded-full'></div>
          <div className='w-full p-4 bg-overlayGray rounded-[26px] flex flex-col gap-[5px]'>
            <div className='text-sm flex justify-between'>
              <div className='skeleton w-[72px] h-[21px]'></div>
              <div className='skeleton w-[162px] h-[21px]'></div>
            </div>
            <div className='skeleton h-[24px]'></div>
          </div>
        </div>
      </div>
      <div className='flex items-start gap-[10px] tablet:gap-[20px]'>
        <div className='skeleton w-[32px] h-[32px] rounded-full'></div>
        <div className='relative w-full text-darkGray'>
          <div className='skeleton py-2 px-4 w-full h-[36px] rounded-[24px]'></div>
          <div
            className={`skeleton w-[16px] h-[16px] absolute bottom-[10px] right-[5%] tablet:right-[2%] z-50`}
          ></div>
          <div
            className={`skeleton w-[150px] h-[24px] absolute top-[10px] left-4 z-10`}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default LoadingBlogDetail;
