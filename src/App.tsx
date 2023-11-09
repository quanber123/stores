import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './components/common/Loading';
import { blogs, categories } from './fake-data/data';
import { setAllBlogs } from './store/slice/blogSlice';
import { setAllProducts } from './store/slice/productSlice';
import { setAllCategories } from './store/slice/categorySlice';
import { useGetProductsQuery } from './store/features/productFeatures';
const Header = lazy(() => import('@/components/common/Header'));
const Scroll = lazy(() => import('@/components/common/Scroll'));
function App() {
  const dispatch = useDispatch();
  const { data: dataProduct, isSuccess: isSuccessProduct } =
    useGetProductsQuery();
  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProduct));
    }
    dispatch(setAllCategories(categories));
    dispatch(setAllBlogs({ blogs: blogs, totalPage: 0 }));
  }, [isSuccessProduct]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Outlet />
        <Scroll />
      </Suspense>
    </>
  );
}

export default App;
