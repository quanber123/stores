import { authInfo } from '@/store/slice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Auth() {
  const user = useSelector(authInfo);
  if (!user) {
    return <Navigate to='*' replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default Auth;
