import { useState, useEffect } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaFacebookF, FaGoogle, FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import './login.css';
import {
  getVisibleLoginModal,
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import { ErrValidate, SuccessValidate, validateEmail } from '@/utils/validate';
import { setAuth } from '@/store/slice/authSlice';
import { useGetUserSuccessQuery } from '@/store/features/authFeatures';
import { useLoginUserMutation } from '@/store/features/userFeatures';
import { useNavigate } from 'react-router-dom';
function LoginModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: dataUser, isSuccess: isSuccessGetUser } =
    useGetUserSuccessQuery(null);
  const [loginUser, { data: dataLogin, isSuccess: isSuccessLogin }] =
    useLoginUserMutation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const visibleModal = useSelector(getVisibleLoginModal);
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  const googleLogin = () => {
    window.open('http://localhost:3000/api/auth/google', '_self');
  };
  const facebookLogin = () => {
    window.open('http://localhost:3000/api/auth/facebook', '_self');
  };
  useEffect(() => {
    if (isSuccessGetUser) dispatch(setAuth(dataUser));
  }, [isSuccessGetUser]);
  useEffect(() => {
    if (isSuccessLogin) {
      dispatch(setAuth(dataLogin));
      navigate('/verified', { replace: true });
    }
  }, [isSuccessLogin]);
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
        <h1 className='w-full text-semiBoldGray font-bold text-lg tablet:text-xl text-center'>
          Welcome
        </h1>
        <img
          className='w-[136px] h-[20px] object-contain'
          src={logo}
          alt='logo'
        />
        <div className='wrap-input-login mt-[20px]'>
          <label
            className={`text-darkGray ${
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
            className={`text-darkGray ${
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
                !validateEmail(form.email) ? 'grayscale(80%)' : 'none'
              }`,
              cursor: `${!validateEmail(form.email) ? 'no-drop' : 'pointer'}`,
            }}
            disabled={!validateEmail(form.email)}
            onClick={() => loginUser(form)}
          >
            LOGIN
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
          <p className='text-darkGray'>Don't have an account?</p>
          <button
            className='text-darkGray hover:text-blue font-bold'
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
