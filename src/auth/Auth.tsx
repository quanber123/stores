import { authInfo } from '@/services/redux/slice/authSlice';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/common/Loading/Loading';
function Auth() {
  const user = useSelector(authInfo);
  if (!user.email) {
    return <Navigate to='/not-found' replace />;
  }
  if (!user.isVerified) {
    return <Navigate to='/verified' replace />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

export default Auth;
