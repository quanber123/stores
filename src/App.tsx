import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loading from './components/common/Loading';
import { blogs } from './fake-data/data';
import { setAllBlogs } from './store/slice/blogSlice';
import {
  setAllProducts,
  setAllProductsOverview,
} from './store/slice/productSlice';
import { setAllCategories } from './store/slice/categorySlice';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from './store/features/productFeatures';
import { useGetUserQuery } from './store/features/authFeatures';
import { setAuth } from './store/slice/authSlice';
import { useGetTagsQuery } from './store/features/tagsFeatures';
import { setAllTags } from './store/slice/tagSlice';
const Header = lazy(() => import('@/components/common/Header'));
const Scroll = lazy(() => import('@/components/common/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer'));
function App() {
  const dispatch = useDispatch();
  const { data: dataProducts, isSuccess: isSuccessProduct } =
    useGetProductsQuery();
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery();
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery();
  const token = window.localStorage.getItem('accessToken');
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(token);
  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProducts));
      dispatch(setAllProductsOverview(dataProducts));
    }
    if (isSuccessCategories) {
      dispatch(setAllCategories(dataCategories));
    }
    if (isSuccessTags) {
      dispatch(setAllTags(dataTags));
    }
    dispatch(setAllBlogs({ blogs: blogs, totalPage: 0 }));
  }, [isSuccessProduct, isSuccessCategories, isSuccessTags]);

  useEffect(() => {
    if (token && isSuccessUser) {
      dispatch(setAuth(dataUser));
    }
  }, [isSuccessUser, token]);
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
