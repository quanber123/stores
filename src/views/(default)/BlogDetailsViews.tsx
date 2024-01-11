import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '@/services/redux/features/blogFeatures';
import LoadingBlogDetail from '@/components/common/Loading/LoadingBlogDetail';
import BlogDetails from '@/components/pages/default/blog-details/BlogDetails';
import Comments from '@/components/pages/default/blog-details/Comments';
import PostComment from '@/components/pages/default/blog-details/PostComment';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import SetHeader from '@/services/utils/set-header';
function BlogDetailsViews() {
  const { id } = useParams();
  const location = useLocation();
  const blogRef = useRef(null);
  const {
    data: blogData,
    isSuccess: isSuccessBlog,
    isLoading: isLoadingBlog,
    isFetching: isFetchingBlog,
    error: errorBlog,
  } = useGetBlogByIdQuery(id, {
    skip: !id,
  });
  //animation
  useLayoutEffect(() => {
    if (blogRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          blogRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        );
      });
      return () => {
        ctx.revert();
      };
    }
  }, [id, blogData]);
  if (isLoadingBlog && isFetchingBlog) {
    return <LoadingBlogDetail />;
  }
  if (errorBlog && 'data' in errorBlog) {
    return <Navigate to={`/not-found/${id}`} />;
  }
  return isSuccessBlog && blogData && !isFetchingBlog ? (
    <>
      <SetHeader
        title={blogData.blog.title}
        description={`Check out ${blogData.blog.title} blog for the latest fashion news.
`}
        isBlockIndex={false}
      />
      <main ref={blogRef} className='relative gap-[40px]'>
        <section className='bg-darkGray absolute top-0 left-0 w-full h-[250px] tablet:h-[450px] -z-10'></section>
        <Breadcrumbs
          breadcrumbs={location.pathname}
          currentId={blogData.blog.title}
        />
        <BlogDetails blogDetails={blogData.blog} />
        <Comments blogDetails={blogData.blog} />
        <PostComment id={blogData.blog._id} />
      </main>
    </>
  ) : (
    <></>
  );
}

export default BlogDetailsViews;
