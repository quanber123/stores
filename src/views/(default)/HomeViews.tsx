import LazyComponent from '@/hooks/useLazyComponent';
import { Suspense, lazy } from 'react';
const BannerHome = lazy(
  () => import('@/components/pages/default/home/BannerHome')
);
const BlogHome = lazy(() => import('@/components/pages/default/home/BlogHome'));
const CategoryHome = lazy(
  () => import('@/components/pages/default/home/CategoryHome')
);
const StoreHome = lazy(
  () => import('@/components/pages/default/home/StoreHome')
);
function HomeViews() {
  return (
    <main className='pb-[84px] gap-[80px]'>
      <Suspense fallback={<div>...Loading</div>}>
        <LazyComponent>
          <BannerHome />
        </LazyComponent>
        <LazyComponent>
          <CategoryHome />
        </LazyComponent>
        <LazyComponent>
          <StoreHome />
        </LazyComponent>
        <LazyComponent>
          <BlogHome />
        </LazyComponent>
      </Suspense>
    </main>
  );
}

export default HomeViews;
