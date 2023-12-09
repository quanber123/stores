import { useState } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import './register.css';
import {
  getVisibleRegisterModal,
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import {
  ErrValidate,
  SuccessValidate,
  validateEmail,
  validatePassword,
} from '@/utils/validate';
function RegisterModal() {
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleRegisterModal);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    code: '',
  });
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
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
        <h1 className='w-full text-semiBoldGray font-bold text-lg tablet:text-xl text-center'>
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
            className={`focus-input-register ${
              focusInput === 'password' || form.password ? 'active' : ''
            }`}
          ></div>
          {!validatePassword(form.password) && form.password ? (
            <ErrValidate message='More than 6 characters and 1 uppercase letter.' />
          ) : (
            <></>
          )}
          {validatePassword(form.password) && form.password ? (
            <SuccessValidate />
          ) : (
            <></>
          )}
        </div>
        <div className='w-full h-[48px] relative'>
          <input
            className='w-full h-full px-[16px] border border-gray rounded-[23px]'
            type='text'
            name='code'
            placeholder='Enter your code...'
            value={form.code}
            onChange={handleChangeForm}
          />
          <button className='absolute top-1/2 right-[5px] -translate-y-1/2 h-4/5 px-[16px] bg-semiBoldGray hover:bg-purple text-white rounded-[23px]'>
            Send Code
          </button>
        </div>
        <div className='w-full register-form-btn'>
          <button
            style={{
              filter: `${
                !form.code ||
                !validateEmail(form.email) ||
                !validatePassword(form.password)
                  ? 'grayscale(80%)'
                  : 'none'
              }`,
              cursor: `${
                !form.code ||
                !validateEmail(form.email) ||
                !validatePassword(form.password)
                  ? 'no-drop'
                  : 'pointer'
              }`,
            }}
            disabled={
              !form.code ||
              !validateEmail(form.email) ||
              !validatePassword(form.password)
            }
          >
            Register
          </button>
        </div>
        <div className='flex justify-center items-center gap-[10px]'>
          <p className='text-darkGray'>Already Have account ?</p>
          <button
            className='text-darkGray hover:text-blue font-bold'
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
