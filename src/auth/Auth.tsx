import { authInfo } from '@/services/redux/slice/authSlice';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Loading from '@/components/common/Loading/Loading';

function Auth() {
  const user = useSelector(authInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate('/not-found', { replace: true });
    } else if (!user.isVerified) {
      navigate('/verified', { replace: true });
    }
  }, [user.email, user.isVerified, navigate]);
  return (
    <Suspense fallback={<Loading />}>
      {user.email && user.isVerified && <Outlet />}
    </Suspense>
  );
}

export default Auth;
