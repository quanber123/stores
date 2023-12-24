import BannerHome from '@/components/pages/default/home/BannerHome';
import BlogHome from '@/components/pages/default/home/BlogHome';
import CategoryHome from '@/components/pages/default/home/CategoryHome';
import StoreHome from '@/components/pages/default/home/StoreHome';
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
