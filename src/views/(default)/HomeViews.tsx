import LoadingComponents from '@/components/common/Loading/LoadingComponents';
import LazyComponent from '@/hooks/useLazyComponent';
import { Suspense, lazy } from 'react';
import BannerHome from '@/components/pages/(default)/home/BannerHome';
const CategoryHome = lazy(
  () => import('@/components/pages/(default)/home/CategoryHome')
);
const StoreHome = lazy(
  () => import('@/components/pages/(default)/home/StoreHome')
);
const BlogHome = lazy(
  () => import('@/components/pages/(default)/home/BlogHome')
);
function HomeViews() {
  return (
    <main className='pb-[84px] gap-[80px]'>
      <BannerHome />
      <LazyComponent>
        <Suspense fallback={<LoadingComponents />}>
          <CategoryHome />
        </Suspense>
      </LazyComponent>
      <LazyComponent>
        <Suspense fallback={<LoadingComponents />}>
          <StoreHome />
        </Suspense>
      </LazyComponent>
      <LazyComponent>
        <Suspense fallback={<LoadingComponents />}>
          <BlogHome />
        </Suspense>
      </LazyComponent>
    </main>
  );
}

export default HomeViews;
