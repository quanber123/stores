import { authInfo } from '@/services/redux/slice/authSlice';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading/Loading';
function Auth() {
  const user = useSelector(authInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.email) {
      navigate('/not-found', { replace: true });
    }
    if (!user.isVerified) {
      navigate('/verified', { replace: true });
    }
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

export default Auth;
