import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCarts, setAuth } from './services/redux/slice/authSlice';
import {
  setAllCategories,
  setAllTags,
} from './services/redux/slice/labelSlice';
import { useGetUserQuery } from './services/redux/features/userFeatures';
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from './services/redux/features/labelFeatures';
import { DropdownProvider } from './components/dropdown/hooks/dropdownContext';
import Loading from './components/common/Loading/Loading';
import { useGetAllCartsQuery } from './services/redux/features/productFeatures';
const Header = lazy(() => import('@/components/common/Header/Header'));
const Scroll = lazy(() => import('@/components/common/ScrollElement/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer/Footer'));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const getToken = searchQuery.get('token') ?? '';
  const token = getToken || window.localStorage.getItem('coza-store-token');
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(
    token || getToken,
    { skip: token || getToken ? false : true }
  );
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  const { data: cartsData, isSuccess: isSuccessCart } = useGetAllCartsQuery(
    token,
    { skip: !token }
  );
  useEffect(() => {
    document.title =
      location.pathname.split('/')[1] !== ''
        ? `${location.pathname.split('/')[1].toUpperCase()} | COZASTORE`
        : 'COZASTORE';
  }, [location.pathname]);
  useEffect(() => {
    if (getToken) {
      window.localStorage.setItem('coza-store-token', getToken);
    }
  }, [getToken]);
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
    if (isSuccessCategories && dataCategories) {
      dispatch(setAllCategories(dataCategories));
    }
    if (isSuccessTags && dataTags) {
      dispatch(setAllTags(dataTags));
    }
  }, [isSuccessCategories, isSuccessTags]);
  useEffect(() => {
    if (isSuccessCart && cartsData) {
      dispatch(setAllCarts(cartsData));
    }
  }, [isSuccessCart, cartsData]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DropdownProvider>
          <Header />
        </DropdownProvider>
        <Outlet />
        <Scroll />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
