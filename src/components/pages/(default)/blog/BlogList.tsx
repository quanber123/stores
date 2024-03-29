import { useRef, useMemo, useLayoutEffect } from 'react';
import gsap from 'gsap';
import PreviewBlog from '@/components/(ui)/blog/PreviewBlog';
import Pagination from '@/components/(ui)/pagination/Pagination';
import { Blog } from '@/interfaces/interfaces';
type Props = {
  blogs: Blog[];
  total: number;
};
const BlogList: React.FC<Props> = ({ blogs, total }) => {
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
};

export default BlogList;
