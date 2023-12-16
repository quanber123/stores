import {
  useResendEmailMutation,
  useVerifiedEmailMutation,
} from '@/store/features/userFeatures';
import { authInfo, removeAuth, setAuth } from '@/store/slice/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '@/assets/images/logo-02.png.webp';
import { useNavigate } from 'react-router-dom';
import NotFoundViews from '@/views/NotFoundViews';
function VerifiedAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(authInfo);
  const [code, setCode] = useState('');
  const [verifiedEmail, { data: DataVerified, isSuccess: isSuccessVerified }] =
    useVerifiedEmailMutation();
  const [resendEmail] = useResendEmailMutation();
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleVerified = () => {
    verifiedEmail({ email: user.email, code: code });
  };
  const handleLogout = () => {
    dispatch(removeAuth());
    window.open('http://localhost:3000/api/auth/logout', '_self');
  };
  useEffect(() => {
    if (isSuccessVerified) {
      dispatch(setAuth(DataVerified));
    }
  }, [isSuccessVerified]);
  useEffect(() => {
    if (user.isVerified || !user.email) {
      navigate('/', { replace: true });
    }
  }, [user]);
  return (
    <>
      <header className='w-full bg-semiBoldGray text-white z-[999]'>
        <nav className='container py-6 flex items-center justify-between'>
          <img src={logo} alt='logo-cozastore' />
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main className='bg-lightGray'>
        <form
          className='bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[8px]'
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className='px-[16px] py-[18px] text-[20px] font-bold'>
            Enter the code from your email
          </h1>
          <div className='p-[16px] text-mediumGray flex flex-col gap-[20px] border-t border-b border-lightGray'>
            <p>
              Let us know that this email address belongs to you. Enter the code
              from the email sent to{' '}
              <span className='font-bold'>{user.email}</span>.
            </p>
            <input
              className='w-[136px] border border-lightGray rounded-[4px] p-[16px]'
              type='text'
              aria-label='code'
              placeholder='Enter code...'
              value={code}
              onChange={handleChangeCode}
            />
            <button className='mr-auto text-[#1877f2]' onClick={resendEmail}>
              Send Email Again
            </button>
          </div>
          <div className='flex justify-end p-4'>
            <button
              className={`${
                code ? 'bg-[#1877f2]' : 'bg-lightGray'
              } text-white w-[145px] h-[36px] rounded-[4px]`}
              disabled={code ? false : true}
              onClick={handleVerified}
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default VerifiedAccount;
