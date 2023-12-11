import BannerHome from '@/components/pages/home/BannerHome';
import BlogHome from '@/components/pages/home/BlogHome';
import CategoryHome from '@/components/pages/home/CategoryHome';
import StoreHome from '@/components/pages/home/StoreHome';
function HomeViews() {
  return (
    <main className='pb-[84px]'>
      <BannerHome />
      <CategoryHome />
      <StoreHome />
      <BlogHome />
    </main>
  );
}

export default HomeViews;
