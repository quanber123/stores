import LoadingBlog from '@/components/common/Loading/LoadingBlog';
import BlogFilter from '@/components/pages/(default)/blog/BlogFilter';
import BlogList from '@/components/pages/(default)/blog/BlogList';
import BlogNotFound from '@/components/pages/(default)/blog/BlogNotFound';
import BlogTitle from '@/components/pages/(default)/blog/BlogTitle';
import { useGetBlogsQuery } from '@/services/redux/features/blogFeatures';
import SetHeader from '@/services/utils/set-header';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
function BlogViews() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPage = Number(searchQuery.get('page')) || 1;
  const {
    data: dataBlogs,
    isSuccess: isSuccessBlog,
    isFetching: isFetchingBlog,
  } = useGetBlogsQuery(
    { search: searchQuery.toString() },
    { skip: !searchQuery.size }
  );
  useEffect(() => {
    if (currentPage) {
      setSearchQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        newQuery.set('page', currentPage.toString());
        return newQuery.toString();
      });
    }
  }, []);
  return (
    <>
      <SetHeader
        title={location.pathname}
        description={`Explore our cozastore's latest fashion articles`}
        isBlockIndex={false}
      />
      <main className='gap-[80px]'>
        <BlogTitle />
        <section className='container flex flex-col-reverse desktop:flex-row gap-[80px]'>
          {isFetchingBlog ? <LoadingBlog /> : <></>}
          {isSuccessBlog && dataBlogs.blogs.length && !isFetchingBlog && (
            <BlogList blogs={dataBlogs.blogs} total={dataBlogs.totalPage} />
          )}
          {isSuccessBlog && !dataBlogs.blogs.length && !isFetchingBlog && (
            <BlogNotFound />
          )}
          <BlogFilter />
        </section>
      </main>
    </>
  );
}
export default BlogViews;
