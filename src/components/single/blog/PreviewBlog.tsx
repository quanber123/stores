import LazyLoadImage from '@/utils/lazyload-image';
import { FaArrowRightLong } from '@/assets/icons/index';
import { Blog } from '@/interfaces/interfaces';
type Props = {
  blog: Blog;
  refEl: (el: HTMLElement) => HTMLElement;
};
const PreviewBlog: React.FC<Props> = ({ blog, refEl }) => {
  return (
    <article ref={refEl} className='relative flex flex-col gap-[20px]'>
      <div>
        <LazyLoadImage
          src={blog.imgSrc}
          className='w-full h-full max-h-[480px]'
          alt={blog.title}
        />
      </div>
      <div
        className='absolute top-4 left-4 tablet:px-4 px-2 tablet:py-2 text-sm tablet:text-base'
        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        <p>{blog.date}</p>
      </div>
      <div className='flex flex-col gap-[10px]'>
        <h3 className='text-lg tablet:text-xl text-semiBoldGray hover:text-purple transition-colors font-bold cursor-pointer'>
          {blog.title}
        </h3>
        <p className='text-mediumGray'>{blog.description}</p>
        <div className='block laptop:flex justify-between items-center'>
          <div className='flex flex-col tablet:flex-row tablet:items-center gap-[10px] text-sm text-semiBoldGray font-medium'>
            <span>by {blog.author}</span>
            <span className='hidden tablet:block'>|</span>
            <span>{blog.tag.join(' , ')}</span>
            <span className='hidden tablet:block'>|</span>
            <span>
              {blog.countCmt > 1
                ? `${blog.countCmt} Comments`
                : `${blog.countCmt} Comment`}
            </span>
          </div>
          <button className='my-4 laptop:my-0 text-sm tablet:text-base text-semiBoldGray hover:text-purple font-bold flex items-center gap-[10px] uppercase'>
            <span>continue reading</span>
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PreviewBlog;
