import LazyLoadImage from '@/utils/lazyload-image';

type propsAbout = {
  srcImg: string;
  alt?: string | undefined;
  title: string;
  description: Array<string | null>;
  quotes?: {
    content: string;
    author: string;
  };
  refEl: (el: HTMLElement) => HTMLElement;
};
function SingleAbout({
  title,
  srcImg,
  description,
  quotes,
  refEl,
}: propsAbout) {
  return (
    <article
      ref={refEl}
      className='article-about flex flex-col laptop:flex-row laptop:even:flex-row-reverse gap-[80px]'
    >
      <div className='laptop:w-2/3 flex flex-col gap-[20px]'>
        <h4 className='text-lg text-semiBoldGray font-bold'>{title}</h4>
        {description?.map((d, index) => {
          return (
            <p key={index} className='text-gray text-sm leading-7'>
              {d}
            </p>
          );
        })}
        {quotes?.content ? (
          <div className='border-l-4 border-l-lightGray px-4 flex flex-col gap-[10px] text-sm'>
            <p className='leading-7 text-gray italic'>{quotes.content}</p>
            <h6 className='text-darkGray'>- {quotes.author}</h6>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='article-about-img laptop:max-w-[370px] laptop:max-h-[370px]'>
        <LazyLoadImage src={srcImg} alt='' className='w-full h-full' />
      </div>
    </article>
  );
}

export default SingleAbout;
