import LoadingComponents from '@/components/common/Loading/LoadingComponents';
import LazyComponent from '@/hooks/useLazyComponent';
import SetHeader from '@/services/utils/set-header';
import { Suspense, lazy } from 'react';
const BannerHome = lazy(
  () => import('@/components/pages/default/home/BannerHome')
);
const CategoryHome = lazy(
  () => import('@/components/pages/default/home/CategoryHome')
);
const StoreHome = lazy(
  () => import('@/components/pages/default/home/StoreHome')
);
const BlogHome = lazy(() => import('@/components/pages/default/home/BlogHome'));
function HomeViews() {
  return (
    <>
      <SetHeader
        title=''
        description='Welcome to cozastore fashion store where we provide you with the most beautiful, luxurious and fashionable products of all time.'
        isBlockIndex={false}
      />
      <main className='pb-[84px] gap-[80px]'>
        <LazyComponent>
          <Suspense fallback={<LoadingComponents />}>
            <BannerHome />
          </Suspense>
        </LazyComponent>
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
    </>
  );
}

export default HomeViews;
