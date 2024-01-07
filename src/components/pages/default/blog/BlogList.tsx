import { useRef, useMemo, useLayoutEffect } from 'react';
import gsap from 'gsap';
import PreviewBlog from '@/components/ui/blog/PreviewBlog';
import { useSelector } from 'react-redux';
import {
  getAllBlogs,
  getTotalPageBlog,
} from '@/services/redux/slice/blogSlice';
import Pagination from '@/components/common/Pagination/Pagination';
function BlogList() {
  const blogs = useSelector(getAllBlogs);
  const total = useSelector(getTotalPageBlog);
  const blogRefs = useRef<Array<HTMLElement | null>>([]);
  const renderedBlog = useMemo(() => {
    return blogs.map((b, index) => {
      return (
        <PreviewBlog
          key={index}
          blog={b}
          refEl={(el) => (blogRefs.current[index] = el)}
        />
      );
    });
  }, [blogs]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      blogRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          gsap.from(ref, {
            x: -200,
            opacity: 0,
            duration: 0.5,
            delay: 0.5 + index * 0.3,
          });
        });
    });
    return () => {
      ctx.revert();
    };
  }, [blogs]);
  return (
    <div className='desktop:w-2/3 flex flex-col gap-[80px]'>
      <div className='flex flex-col gap-[80px]'>{renderedBlog}</div>
      <Pagination totalPage={total} />
    </div>
  );
}

export default BlogList;
