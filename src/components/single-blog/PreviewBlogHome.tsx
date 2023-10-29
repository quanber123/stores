import Carousel from '@/utils/carousel';
import LazyLoadImage from '@/utils/lazyload-image';

type propsBLog = {
  srcImg: string;
  altImg?: string;
  refEl: (el: HTMLElement) => HTMLElement;
  author: string;
  date: string;
  title: string;
  description: string;
};
function PreviewBlogHome({
  srcImg,
  altImg,
  author,
  date,
  refEl,
  title,
  description,
}: propsBLog) {
  const { width } = Carousel(0);
  return (
    <article
      ref={refEl}
      className='relative flex-shrink-0 flex-grow-0 flex flex-col gap-[15px]'
      style={{ width: `calc(${width}% - 20px)` }}
    >
      <div className='blog-preview relative overflow-hidden cursor-pointer'>
        <LazyLoadImage
          className='w-full max-h-[390px]'
          src={srcImg}
          alt={altImg}
        />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <p className='text-sm'>
          By {author} on {date}
        </p>
        <h5 className='text-md tablet:text-lg hover:text-purple transition-colors cursor-pointer'>
          {title.substring(0, 50)}...
        </h5>
        <p className='text-sm text-gray'>{description}</p>
      </div>
    </article>
  );
}

export default PreviewBlogHome;
