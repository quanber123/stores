import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './components/common/Loading';
import { blogs } from './fake-data/data';
import { setAllBlogs } from './store/slice/blogSlice';
import { setAllProducts } from './store/slice/productSlice';
import { setAllCategories } from './store/slice/categorySlice';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from './store/features/productFeatures';
import { useGetUserQuery } from './store/features/authFeatures';
import { setAuth } from './store/slice/authSlice';
const Header = lazy(() => import('@/components/common/Header'));
const Scroll = lazy(() => import('@/components/common/Scroll'));
function App() {
  const dispatch = useDispatch();
  const { data: dataProduct, isSuccess: isSuccessProduct } =
    useGetProductsQuery(null);
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const token = window.localStorage.getItem('accessToken');
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(token);
  useEffect(() => {
    if (isSuccessCategories) {
      dispatch(setAllCategories(dataCategories));
    }
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProduct));
    }
    dispatch(setAllBlogs({ blogs: blogs, totalPage: 0 }));
  }, [isSuccessProduct, isSuccessCategories]);

  useEffect(() => {
    if (token && isSuccessUser) {
      dispatch(setAuth(dataUser));
      console.log(dataUser);
    }
  }, [isSuccessUser]);
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
