import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Navigate, useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '@/store/features/blogFeatures';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, setBlogsDetails } from '@/store/slice/blogSlice';
import LoadingBlogDetail from '@/components/common/Loading/LoadingBlogDetail';
import BlogDetails from '@/components/pages/blog-details/BlogDetails';
import Comments from '@/components/pages/blog-details/Comments';
import PostComment from '@/components/pages/blog-details/PostComment';
function BlogDetailsViews() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetails = useSelector(getBlogDetails);
  const blogRef = useRef(null);
  const {
    data: blogData,
    isSuccess: isSuccessBlog,
    isLoading: isLoadingBlog,
    isFetching: isFetchingBlog,
    error: errorBlog,
    refetch: reFetchBlogData,
  } = useGetBlogByIdQuery(id, {
    skip: !id,
  });
  //checking blog-details
  useEffect(() => {
    if (isSuccessBlog && !isLoadingBlog && !isFetchingBlog) {
      dispatch(setBlogsDetails(blogData));
    }
  }, [dispatch, isSuccessBlog, isLoadingBlog, isFetchingBlog, blogData]);

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
  return (
    <main ref={blogRef} className='relative'>
      <div className='bg-darkGray absolute top-0 left-0 w-full h-[250px] tablet:h-[450px] -z-10'></div>
      <BlogDetails blogDetails={blogDetails} />
      <Comments blogDetails={blogDetails} />
      <PostComment id={blogDetails._id} reFetchBlogData={reFetchBlogData} />
    </main>
  );
}

export default BlogDetailsViews;
