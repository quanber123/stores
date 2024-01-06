import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/slice/authSlice';
import { setHeader } from './utils/set-header';
import { setAllCategories } from './store/slice/categorySlice';
import { setAllTags } from './store/slice/tagSlice';
import { useGetUserQuery } from './store/features/userFeatures';
import { useGetTagsQuery } from './store/features/tagsFeatures';
import { useGetCategoriesQuery } from './store/features/categoryFeatures';
import Loading from './components/common/Loading/Loading';
import { useGetBannersQuery } from './store/features/bannerFeatures';
import { setAllBanners } from './store/slice/bannerSlice';
const Header = lazy(() => import('@/components/common/Header/Header'));
const Scroll = lazy(() => import('@/components/common/ScrollElement/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer/Footer'));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const accessToken = searchQuery.get('token') ?? '';
  const token = window.localStorage.getItem('coza-store-token');
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(
    token || accessToken,
    { skip: token || accessToken ? false : true }
  );
  const { data: dataBanners, isSuccess: isSuccessBanners } =
    useGetBannersQuery(null);
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  useEffect(() => {
    setHeader(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem('coza-store-token', accessToken);
    }
  }, [accessToken]);
  useEffect(() => {
    if (isSuccessUser && dataUser) {
      dispatch(setAuth(dataUser));
      setSearchQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        newQuery.delete('token');
        return newQuery.toString();
      });
      if (dataUser.isVerified === false) {
        navigate('/verified', { replace: true });
      }
    }
  }, [isSuccessUser, dataUser]);
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
