import { useState, useEffect, useCallback } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaFacebookF, FaGoogle, FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAllModal,
  getVisibleLoginModal,
  setVisibleAlertModal,
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import { ErrValidate, SuccessValidate, validateEmail } from '@/utils/validate';
import { setAuth } from '@/store/slice/authSlice';
import { useLoginUserMutation } from '@/store/features/userFeatures';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';
function LoginModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    loginUser,
    {
      data: dataLogin,
      isSuccess: isSuccessLogin,
      isLoading: isLoadingUser,
      status: statusLogin,
      error: errorLogin,
    },
  ] = useLoginUserMutation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const visibleModal = useSelector(getVisibleLoginModal);
  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => {
        return { ...prevForm, [name]: value };
      });
    },
    [form]
  );
  const googleLogin = () => {
    window.open('http://localhost:3000/api/auth/google', '_self');
  };
  const facebookLogin = () => {
    window.open('http://localhost:3000/api/auth/facebook', '_self');
  };
  const handleLoginUser = () => {
    loginUser(form);
  };
  useEffect(() => {
    if (isSuccessLogin && !isLoadingUser && statusLogin === 'fulfilled') {
      dispatch(closeAllModal());
      dispatch(setAuth(dataLogin));
      navigate('/verified', { replace: true });
    }
    if (errorLogin && 'data' in errorLogin) {
      const errorData = errorLogin.data as { message: string };
      dispatch(
        setVisibleAlertModal({
          status: 'failed',
          message: `Failed: ${errorData}`,
        })
      );
    }
  }, [
    loginUser,
    navigate,
    dispatch,
    isSuccessLogin,
    isLoadingUser,
    statusLogin,
    errorLogin,
  ]);
  return (
    <section className={`${visibleModal ? 'active' : ''} login-form`}>
      <form
        className='px-[24px] tablet:px-[55px] py-[75px]'
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          className='absolute top-[20px] right-[20px] w-[40px] h-[40px] flex justify-center items-center text-md bg-lightGray rounded-full'
          aria-label='close-modal'
          onClick={() => dispatch(setVisibleLoginModal())}
        >
          <FaXmark />
        </button>
        <h1 className='w-full text-darkGray font-bold text-lg tablet:text-xl text-center'>
          Welcome
        </h1>
        <img
          className='w-[136px] h-[20px] object-contain'
          src={logo}
          alt='logo'
        />
        <div className='wrap-input-login mt-[20px]'>
          <label
            className={`text-mediumGray ${
              focusInput === 'email' || form.email ? 'active' : ''
            }`}
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={form.email}
            onFocus={() => setFocusInput('email')}
            onBlur={() => setFocusInput(null)}
            onChange={handleChangeForm}
          />
          <div
            className={`focus-input-login ${
              focusInput === 'email' || form.email ? 'active' : ''
            }`}
          ></div>
          {!validateEmail(form.email) && form.email ? (
            <ErrValidate message='The email must contain @.' />
          ) : (
            <></>
          )}
          {validateEmail(form.email) && form.email ? (
            <SuccessValidate />
          ) : (
            <></>
          )}
        </div>
        <div className='wrap-input-login'>
          <label
            className={`text-mediumGray ${
              focusInput === 'password' || form.password ? 'active' : ''
            }`}
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onFocus={() => setFocusInput('password')}
            onBlur={() => setFocusInput(null)}
            onChange={handleChangeForm}
          />
          <div
            className={`focus-input-login ${
              focusInput === 'password' || form.password ? 'active' : ''
            }`}
          ></div>
        </div>
        <div className='w-full login-form-btn'>
          <button
            style={{
              filter: `${
                !validateEmail(form.email) || statusLogin === 'pending'
                  ? 'grayscale(80%)'
                  : 'none'
              }`,
              cursor: `${
                !validateEmail(form.email) || statusLogin === 'pending'
                  ? 'no-drop'
                  : 'pointer'
              }`,
            }}
            disabled={!validateEmail(form.email) || statusLogin === 'pending'}
            onClick={handleLoginUser}
          >
            {statusLogin === 'pending' ? '...Loading' : 'Login'}
          </button>
        </div>
        <div className='w-full flex flex-col mobile:flex-row justify-center items-center gap-[20px] text-white'>
          <button
            type='submit'
            className='w-full mobile:w-1/2 h-[48px] bg-boldBlue flex justify-center items-center gap-[10px] rounded-[4px]'
            aria-label='facebook-btn'
            onClick={facebookLogin}
          >
            <FaFacebookF className='text-lg' />
            <span>Facebook</span>
          </button>
          <button
            type='submit'
            className='w-full mobile:w-1/2 h-[48px] bg-lightRed flex justify-center items-center gap-[10px] rounded-[4px]'
            aria-label='google-btn'
            onClick={googleLogin}
          >
            <FaGoogle className='text-lg' />
            <span>Google</span>
          </button>
        </div>
        <div className='flex justify-center items-center gap-[10px]'>
          <p className='text-mediumGray'>Don't have an account?</p>
          <button
            className='text-mediumGray hover:text-blue font-bold'
            onClick={() => dispatch(setVisibleRegisterModal())}
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginModal;
