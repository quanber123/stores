import {
  useState,
  useEffect,
  useCallback,
  useContext,
  MutableRefObject,
} from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaFacebookF, FaGoogle, FaXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {
  ErrValidate,
  SuccessValidate,
  validateEmail,
} from '@/services/utils/validate';
import { setAuth, setToken } from '@/services/redux/slice/authSlice';
import { useLoginUserMutation } from '@/services/redux/features/userFeatures';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';
import Modal from '@/Modal';
import { ModalContext } from '../../hooks/modalContext';
import useClickOutside from '@/hooks/useClickOutside';
function LoginModal() {
  const { state, setVisibleModal, closeAllModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalRef, clickOutside] = useClickOutside('visibleLoginModal');
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
      closeAllModal();
      dispatch(setAuth(dataLogin));
      dispatch(setToken(dataLogin.accessToken));
      console.log(dataLogin);
      dataLogin.user.isVerified
        ? navigate('/', { replace: true })
        : navigate('/verified', { replace: true });
    }
    if (errorLogin && 'data' in errorLogin) {
      const errorData = errorLogin.data as { message: string };
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: `Failed: ${errorData?.message}`,
        },
      });
    }
  }, [
    loginUser,
    navigate,
    isSuccessLogin,
    isLoadingUser,
    statusLogin,
    errorLogin,
  ]);
  return (
    <Modal>
      <section
        className={`${state.visibleLoginModal ? 'active' : ''} login-form`}
        onClick={clickOutside}
      >
        <form
          ref={modalRef as MutableRefObject<HTMLFormElement>}
          className='px-[24px] tablet:px-[55px] py-[75px]'
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            className='absolute top-[20px] right-[20px] w-[40px] h-[40px] flex justify-center items-center text-md bg-lightGray rounded-full'
            aria-label='close-modal'
            onClick={() => setVisibleModal('visibleLoginModal')}
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
              htmlFor='email-login'
            >
              Email
            </label>
            <input
              type='email'
              id='email-login'
              name='email'
              value={form.email}
              onFocus={() => setFocusInput('email')}
              onBlur={() => setFocusInput(null)}
              onChange={handleChangeForm}
              autoComplete='username'
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
              htmlFor='password-login'
            >
              Password
            </label>
            <input
              id='password-login'
              name='password'
              type='password'
              value={form.password}
              onFocus={() => setFocusInput('password')}
              onBlur={() => setFocusInput(null)}
              onChange={handleChangeForm}
              autoComplete='current-password'
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
              onClick={() => setVisibleModal('visibleRegisterModal')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default LoginModal;
