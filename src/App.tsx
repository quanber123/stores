import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  accessToken,
  setAuth,
  setToken,
} from './services/redux/slice/authSlice';
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
const Header = lazy(() => import('@/components/common/Header/Header'));
const Scroll = lazy(() => import('@/components/common/ScrollElement/Scroll'));
const Footer = lazy(() => import('@/components/common/Footer/Footer'));
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const getToken = searchQuery.get('token') ?? '';
  const token = useSelector(accessToken);
  const { data: dataUser, isSuccess: isSuccessUser } = useGetUserQuery(
    token || getToken,
    { skip: token || getToken ? false : true }
  );
  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetCategoriesQuery(null);
  const { data: dataTags, isSuccess: isSuccessTags } = useGetTagsQuery(null);
  useEffect(() => {
    if (getToken) {
      dispatch(setToken(getToken));
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
  }, [isSuccessCategories]);
  useEffect(() => {
    if (isSuccessTags && dataTags) {
      dispatch(setAllTags(dataTags));
    }
  }, [isSuccessTags]);

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
