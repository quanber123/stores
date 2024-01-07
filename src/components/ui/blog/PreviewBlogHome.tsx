import { capitalizeFirstLetter, formatDate } from '@/services/utils/format';
import LazyLoadImage from '@/services/utils/lazyload-image';
import scrollElement from '@/services/utils/scroll-elements';
import { useNavigate } from 'react-router-dom';

type propsBLog = {
  blog: any;
  refEl: (el: HTMLElement) => HTMLElement;
  style?: React.CSSProperties;
};
function PreviewBlogHome({ blog, refEl, style }: propsBLog) {
  const navigate = useNavigate();
  const handleLinkClick = (id: string | number) => {
    scrollElement();
    navigate(`/blogs/${id}`);
  };
  return (
    <article
      ref={refEl}
      className='flex flex-col gap-[15px] flex-shrink-0 flex-grow-0'
      style={style}
    >
      <div className='blog-preview overflow-hidden w-full max-h-[240px] cursor-pointer'>
        <LazyLoadImage
          className='w-full h-[240px] hover:scale-110'
          style={{ transition: 'all 0.3s linear' }}
          src={blog.imgSrc}
          alt={blog.title}
        />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <p className='text-sm'>
          By{' '}
          <span className='text-darkGray font-bold'>
            {capitalizeFirstLetter(blog.author)}
          </span>{' '}
          on{' '}
          <span className='text-darkGray font-bold'>
            {formatDate(blog.created_at)}
          </span>
        </p>
        <p
          className='line-camp-text text-md tablet:text-lg hover:text-purple transition-colors cursor-pointer'
          onClick={() => handleLinkClick(blog._id)}
        >
          {blog?.title}
        </p>
        <p className='line-camp-paragraph ext-sm text-semiBoldGray'>
          {blog.open_paragraph}
        </p>
      </div>
    </article>
  );
}

export default PreviewBlogHome;
