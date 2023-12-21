import { authInfo } from '@/store/slice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function Auth() {
  const user = useSelector(authInfo);
  if (user.isVerified || !user.email) {
    return <Navigate to='/not-found' replace />;
  }
  if (user.isVerified) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
}

export default Auth;
