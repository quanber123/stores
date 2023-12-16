import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useMemo } from 'react';
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
import { setHeader } from './utils/set-header';
import { useGetBannersQuery } from './store/features/bannerFeatures';
import { setAllBanners } from './store/slice/bannerSlice';
import AlertModal from './components/modal/alert-modal/AlertModal';
import ViewProductModal from './components/modal/view-product-modal/ViewProductModal';
const Header = lazy(() => import('@/components/common/Header/Header'));
const Scroll = lazy(() => import('@/components/common/ScrollElement/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer/Footer'));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useMemo(() => {
    return window.localStorage.getItem('accessToken');
  }, []);
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(token, {
    skip: token ? false : true,
  });
  const { data: dataProducts, isSuccess: isSuccessProducts } =
    useGetProductsQuery({
      page: 1,
    });
  const { data: dataBanners, isSuccess: isSuccessBanners } =
    useGetBannersQuery(null);
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  useEffect(() => {
    setHeader(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (token && isSuccessUser && dataUser) {
      dispatch(setAuth(dataUser));
      if (dataUser.isVerified === false) {
        navigate('/verified', { replace: true });
      }
    }
  }, [isSuccessUser]);
  useEffect(() => {
    if (isSuccessProducts && dataProducts) {
      dispatch(setAllProductsOverview(dataProducts));
      dispatch(setAllProducts(dataProducts));
    }
  }, [isSuccessProducts]);
  useEffect(() => {
    if (isSuccessBanners && dataBanners) {
      dispatch(setAllBanners(dataBanners));
    }
  }, [isSuccessBanners]);
  useEffect(() => {
    if (isSuccessCategories && dataCategories) {
      dispatch(setAllCategories(dataCategories));
    }
  }, [isSuccessCategories]);
  useEffect(() => {
    if (isSuccessTags && dataTags) {
      dispatch(setAllTags(dataTags));
    }
    dispatch(setAllBlogs({ blogs: blogs, totalPage: 0 }));
  }, [isSuccessTags]);
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Outlet />
      <Scroll />
      <Footer />
    </Suspense>
  );
}

export default App;
