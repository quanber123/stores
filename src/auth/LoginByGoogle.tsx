import { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useLoginByGoogleMutation } from '@/store/features/authFeatures';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '@/store/slice/authSlice';
import { useDispatch } from 'react-redux';
function LoginByGoogle() {
  const navigate = useNavigate();
  const [
    loginByGoogle,
    { data: dataAdmin, isSuccess: isLoginSuccess, isLoading: isLoginLoading },
  ] = useLoginByGoogleMutation();
  const dispatch = useDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await loginByGoogle(code);
    },
    flow: 'auth-code',
  });
  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setAuth(dataAdmin));
      navigate('/', { replace: true });
    }
  }, [isLoginSuccess, dispatch]);
  return (
    <button
      className='btn-auth'
      onClick={googleLogin}
      disabled={isLoginLoading}
    >
      Login
    </button>
  );
}

export default LoginByGoogle;
