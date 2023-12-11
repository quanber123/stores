import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { blogs } from './fake-data/data';
import { setAllBlogs } from './store/slice/blogSlice';
import { setAllCategories } from './store/slice/categorySlice';
import { useGetUserQuery } from './store/features/authFeatures';
import { setAuth } from './store/slice/authSlice';
import { useGetTagsQuery } from './store/features/tagsFeatures';
import { setAllTags } from './store/slice/tagSlice';
import { useGetCategoriesQuery } from './store/features/categoryFeatures';
import Loading from './components/common/Loading/Loading';
import { useGetProductsQuery } from './store/features/productFeatures';
import {
  setAllProducts,
  setAllProductsOverview,
} from './store/slice/productSlice';
const Header = lazy(() => import('@/components/common/Header/Header'));
const Scroll = lazy(() => import('@/components/common/ScrollElement/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer/Footer'));
function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('accessToken');
  const { data: dataUser, isSuccess: isSuccessUser } = token
    ? useGetUserQuery(token)
    : { data: undefined, isSuccess: false };
  const { data: dataProducts, isSuccess: isSuccessProducts } =
    useGetProductsQuery({
      page: 1,
    });
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  useEffect(() => {
    if (token && isSuccessUser) {
      dispatch(setAuth(dataUser));
    }
  }, [isSuccessUser, token]);
  useEffect(() => {
    if (isSuccessProducts) {
      dispatch(setAllProductsOverview(dataProducts));
      dispatch(setAllProducts(dataProducts));
    }
  }, [isSuccessProducts]);
  useEffect(() => {
    if (isSuccessCategories) {
      dispatch(setAllCategories(dataCategories));
    }
  }, [isSuccessCategories]);

  useEffect(() => {
    if (isSuccessTags) {
      dispatch(setAllTags(dataTags));
    }
    dispatch(setAllBlogs({ blogs: blogs, totalPage: 0 }));
  }, [isSuccessTags]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Outlet />
        <Scroll />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
