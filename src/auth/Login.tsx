import { useState, useEffect } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { FaFacebookF, FaGoogle } from 'react-icons/fa6';
import './login.css';
function Login() {
  const [focusInput, setFocusInput] = useState<string | null>(null);
  const googleLogin = () => {
    window.open('http://localhost:3000/api/auth/google', '_self');
  };
  const facebookLogin = () => {
    window.open('http://localhost:3000/api/auth/facebook', '_self');
  };
  useEffect(() => {
    fetch('http://localhost:3000/api/auth/login/success', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User Info:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <main className='login-form py-[128px] px-[24px] w-full h-full flex justify-center items-center'>
      <form
        className='px-[24px] tablet:px-[55px] py-[75px]'
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className='text-semiBoldGray font-bold text-lg tablet:text-xl text-center'>
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
              focusInput === 'email' ? 'active' : ''
            }`}
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            onFocus={() => setFocusInput('email')}
            onBlur={() => setFocusInput(null)}
          />
          <div
            className={`focus-input-login ${
              focusInput === 'email' ? 'active' : ''
            }`}
          ></div>
        </div>
        <div className='wrap-input-login'>
          <label
            className={`text-darkGray ${
              focusInput === 'password' ? 'active' : ''
            }`}
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            onFocus={() => setFocusInput('password')}
            onBlur={() => setFocusInput(null)}
          />
          <div
            className={`focus-input-login ${
              focusInput === 'password' ? 'active' : ''
            }`}
          ></div>
        </div>
        <div className='login-form-btn'>
          <button>LOGIN</button>
        </div>
        <div className='flex flex-col mobile:flex-row justify-center items-center gap-[20px] text-white'>
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
          <button className='text-darkGray hover:text-blue font-bold'>
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
