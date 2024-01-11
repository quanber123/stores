import LazyLoadImage from '@/services/utils/lazyload-image';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Blog } from '@/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import scrollElement from '@/services/utils/scroll-elements';
import {
  capitalize,
  capitalizeFirstLetter,
  formatDate,
} from '@/services/utils/format';
import { useMemo } from 'react';
type Props = {
  blog: Blog;
  refEl?: (el: HTMLElement) => HTMLElement;
};
const PreviewBlog: React.FC<Props> = ({ blog, refEl }) => {
  const navigate = useNavigate();
  const handleLinkClick = (id: number | string) => {
    scrollElement();
    navigate(`/blogs/${id}`, { replace: true });
  };
  const tags = useMemo(() => {
    return blog.tags
      .slice(0, 3)
      .map((t) => capitalize(t.name))
      .join(' , ');
  }, [blog.tags]);
  return (
    <article
      ref={refEl}
      className='relative flex flex-col gap-[10px] tablet:gap-[20px]'
    >
      <div className='w-full overflow-hidden cursor-pointer'>
        <LazyLoadImage
          src={blog.imgSrc}
          className='w-full h-[210px] tablet:h-[384px]  flex-shrink-0 flex-grow-0 hover:scale-110'
          style={{ transition: 'all 0.3s linear' }}
          alt={blog.title}
        />
      </div>
      <div
        className='absolute top-4 left-4 tablet:px-4 px-2 tablet:py-2 text-sm tablet:text-base'
        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
      >
        <p>{formatDate(blog.created_at)}</p>
      </div>
      <div className='flex flex-col gap-[10px]'>
        <h5
          className='line-camp-text text-[20px] tablet:text-xl text-semiBoldGray hover:text-purple transition-colors font-bold cursor-pointer'
          onClick={() => handleLinkClick(blog._id)}
        >
          {blog.title}
        </h5>
        <p className='line-camp-text text-sm tablet:text-base text-mediumGray'>
          {blog.open_paragraph}
        </p>
        <div className='block laptop:flex justify-between items-center'>
          <div className='flex flex-col tablet:flex-row tablet:items-center gap-[10px] text-sm text-semiBoldGray font-medium'>
            <p>
              by{' '}
              <span className='font-bold'>
                {capitalizeFirstLetter(blog.author)}
              </span>
            </p>
            <span className='hidden tablet:block'>|</span>
            <p className='font-bold'>
              {blog.tags.length > 3 ? `${tags} ...` : tags}
            </p>
            <span className='hidden tablet:block'>|</span>
            <p>
              {blog.totalComments > 1
                ? `${blog.totalComments} Comments`
                : `${blog.totalComments} Comment`}
            </p>
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
