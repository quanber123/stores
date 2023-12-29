import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/slice/authSlice';
import { setHeader } from './utils/set-header';
import { setAllBlogs } from './store/slice/blogSlice';
import { setAllCategories } from './store/slice/categorySlice';
import { setAllTags } from './store/slice/tagSlice';
import {
  useGetUserQuery,
  useGetUserSuccessQuery,
} from './store/features/userFeatures';
import { useGetTagsQuery } from './store/features/tagsFeatures';
import { useGetCategoriesQuery } from './store/features/categoryFeatures';
import Loading from './components/common/Loading/Loading';
import { useGetProductsQuery } from './store/features/productFeatures';
import {
  setAllProducts,
  setAllProductsOverview,
} from './store/slice/productSlice';
import { useGetBannersQuery } from './store/features/bannerFeatures';
import { setAllBanners } from './store/slice/bannerSlice';
import { useGetBlogsQuery } from './store/features/blogFeatures';
import LoginModal from './components/modal/login-modal/LoginModal';
// import { checkSession } from './utils/validate';
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
  // const { data: dataUserSession, isSuccess: isSuccessSession } =
  //   useGetUserSuccessQuery(null, { skip: checkSession() ? false : true });
  const { data: dataUserSession, isSuccess: isSuccessSession } =
    useGetUserSuccessQuery(null, { skip: token ? true : false });
  const { data: dataProducts, isSuccess: isSuccessProducts } =
    useGetProductsQuery({
      page: 1,
    });
  const { data: dataBlogs, isSuccess: isSuccessBlogs } = useGetBlogsQuery({
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
  }, [token, isSuccessUser, dataUser]);
  useEffect(() => {
    if (isSuccessSession) {
      dispatch(setAuth(dataUserSession));
    }
  }, [isSuccessSession]);
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
  }, [isSuccessTags]);
  useEffect(() => {
    if (isSuccessBlogs && dataBlogs) {
      dispatch(setAllBlogs(dataBlogs));
    }
  }, [isSuccessBlogs]);
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
