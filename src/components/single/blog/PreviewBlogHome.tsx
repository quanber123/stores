import { Blog } from '@/interfaces/interfaces';
import LazyLoadImage from '@/utils/lazyload-image';
import scrollElement from '@/utils/scroll-elements';
import { useNavigate } from 'react-router-dom';

type propsBLog = {
  blog: Blog;
  refEl: (el: HTMLElement) => HTMLElement;
  style?: React.CSSProperties;
};
function PreviewBlogHome({ blog, refEl, style }: propsBLog) {
  const navigate = useNavigate();
  const handleLinkClick = (id: string | number) => {
    scrollElement();
    navigate(`/blog/${id}`);
  };
  return (
    <article
      ref={refEl}
      className='flex flex-col gap-[15px] flex-shrink-0 flex-grow-0'
      style={style}
    >
      <div className='blog-preview overflow-hidden w-full max-h-[240px] cursor-pointer'>
        <LazyLoadImage
          className='w-full h-[240px]'
          src={blog.imgSrc}
          alt={blog.title}
        />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <p className='text-sm'>
          By {blog.author} on {blog.date}
        </p>
        <h6
          className='text-md tablet:text-lg hover:text-purple transition-colors cursor-pointer'
          onClick={() => handleLinkClick(blog.id)}
        >
          {blog?.title}
        </h6>
        <p className='text-sm text-gray'>{blog.description}</p>
      </div>
    </article>
  );
}

export default PreviewBlogHome;
