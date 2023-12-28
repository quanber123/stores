import { useEffect, useState } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaXmark, FaLightbulb } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAllModal,
  getVisibleRegisterModal,
  setVisibleAlertModal,
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import {
  ErrValidate,
  SuccessValidate,
  validateEmail,
  validatePassword,
} from '@/utils/validate';
import { useRegisterUserMutation } from '@/store/features/userFeatures';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '@/store/slice/authSlice';
import './RegisterModal.css';

function RegisterModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visibleModal = useSelector(getVisibleRegisterModal);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [
    registerUser,
    {
      data: dataRegister,
      isSuccess: isSuccessRegister,
      isLoading: isLoadingRegister,
      status: statusRegister,
      error: errorRegister,
    },
  ] = useRegisterUserMutation();
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  const handleVerifiedEmail = () => {
    registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };
  const handleKeyDownRegister = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && visibleModal) {
      dispatch(setVisibleRegisterModal());
    }
    if (e.key === 'Enter' && visibleModal) {
      registerUser(form);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownRegister);
    return () => {
      document.removeEventListener('keydown', handleKeyDownRegister);
    };
  }, [visibleModal]);
  useEffect(() => {
    if (
      isSuccessRegister &&
      !isLoadingRegister &&
      statusRegister === 'fulfilled'
    ) {
      dispatch(closeAllModal());
      dispatch(setAuth(dataRegister));
      navigate('/verified', { replace: true });
    }
    if (errorRegister && 'data' in errorRegister) {
      const errorData = errorRegister.data as { message: string };
      dispatch(
        setVisibleAlertModal({
          status: 'failed',
          message: `Failed: ${errorData?.message}`,
        })
      );
    }
  }, [
    dispatch,
    navigate,
    isSuccessRegister,
    isLoadingRegister,
    statusRegister,
    errorRegister,
  ]);
  return (
    <section className={`${visibleModal ? 'active' : ''} register-form`}>
      <form
        className='px-[24px] tablet:px-[55px] py-[75px]'
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          className='absolute top-[20px] right-[20px] w-[40px] h-[40px] flex justify-center items-center text-md bg-lightGray rounded-full'
          aria-label='close-modal'
          onClick={() => dispatch(setVisibleRegisterModal())}
        >
          <FaXmark />
        </button>
        <h1 className='w-full text-darkGray font-bold text-lg tablet:text-xl text-center'>
          Register
        </h1>
        <img
          className='w-[136px] h-[20px] object-contain'
          src={logo}
          alt='logo'
        />
        <div
          className='wrap-input-register mt-[20px]'
          onClick={() => setFocusInput('name')}
        >
          <label
            className={`text-darkGray ${
              focusInput === 'name' || form.name ? 'active' : ''
            }`}
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='name'
            id='name'
            name='name'
            value={form.name}
            onFocus={() => setFocusInput('name')}
            onBlur={() => setFocusInput(null)}
            onChange={handleChangeForm}
          />
          <div
            className={`focus-input-register ${
              focusInput === 'name' || form.name ? 'active' : ''
            }`}
          ></div>
        </div>
        <div
          className='wrap-input-register'
          onClick={() => setFocusInput('email')}
        >
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
            className={`focus-input-register ${
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
        <div
          className='wrap-input-register'
          onClick={() => setFocusInput('password')}
        >
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
            className={`focus-input-register ${
              focusInput === 'password' || form.password ? 'active' : ''
            }`}
          ></div>
          <div className='absolute -bottom-[120%] flex gap-[5px]'>
            <FaLightbulb className='text-[20px]' />
            <span>:</span>
            <p className='font-semiBold text-semiBoldGray'>
              The password must be longer than 6 characters and contain at least
              1 uppercase letter.
            </p>
          </div>
          {!validatePassword(form.password) && form.password ? (
            <ErrValidate message='Password is not valid!' />
          ) : (
            <></>
          )}
          {validatePassword(form.password) && form.password ? (
            <SuccessValidate />
          ) : (
            <></>
          )}
        </div>
        {/* <div className='w-full h-[48px] my-8 relative'>
          <input
            className='w-full h-full px-[16px] border border-gray rounded-[23px]'
            type='text'
            name='code'
            placeholder='Enter your code...'
            value={form.code}
            onChange={handleChangeForm}
          />
          <button
            className='absolute top-1/2 right-[5px] -translate-y-1/2 h-4/5 px-[16px] bg-semiBoldGray hover:bg-purple text-white rounded-[23px]'
            onClick={handleVerifiedEmail}
          >
            Send Code
          </button>
        </div> */}
        <div className='mt-8 w-full register-form-btn'>
          <button
            style={{
              filter: `${
                !validateEmail(form.email) || !validatePassword(form.password)
                  ? 'grayscale(80%)'
                  : 'none'
              }`,
              cursor: `${
                !validateEmail(form.email) || !validatePassword(form.password)
                  ? 'no-drop'
                  : 'pointer'
              }`,
            }}
            disabled={
              !validateEmail(form.email) || !validatePassword(form.password)
            }
            onClick={handleVerifiedEmail}
          >
            Register
          </button>
        </div>
        <div className='flex justify-center items-center gap-[10px]'>
          <p className='text-mediumGray'>Already Have account ?</p>
          <button
            className='text-mediumGray hover:text-blue font-bold'
            onClick={() => dispatch(setVisibleLoginModal())}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default RegisterModal;
