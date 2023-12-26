import {
  useResendEmailMutation,
  useVerifiedEmailMutation,
} from '@/store/features/userFeatures';
import { authInfo, setAuth } from '@/store/slice/authSlice';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setVisibleAlertModal } from '@/store/slice/modalSlice';
function VerifiedAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(authInfo);
  const [code, setCode] = useState('');
  const formRef = useRef(null);
  const [
    verifiedEmail,
    {
      data: DataVerified,
      isSuccess: isSuccessVerified,
      isLoading: isLoadingVerified,
      status: statusVerified,
      error: errorVerified,
    },
  ] = useVerifiedEmailMutation();
  const [
    resendEmail,
    {
      isSuccess: isResendEmailSuccess,
      isLoading: isLoadingSendMail,
      status: statusResend,
    },
  ] = useResendEmailMutation();
  const handleChangeCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    },
    [code]
  );
  const handleVerified = () => {
    verifiedEmail({ email: user.email, code: code });
  };
  const handleResendEmail = () => {
    resendEmail(user.email);
  };
  useEffect(() => {
    if (
      isResendEmailSuccess &&
      !isLoadingSendMail &&
      statusResend === 'fulfilled'
    ) {
      dispatch(
        setVisibleAlertModal({
          status: 'success',
          message: 'Success: Code was sent!',
        })
      );
    }
  }, [
    resendEmail,
    dispatch,
    isResendEmailSuccess,
    isLoadingSendMail,
    statusResend,
  ]);
  useEffect(() => {
    if (
      isSuccessVerified &&
      !isLoadingVerified &&
      statusVerified === 'fulfilled'
    ) {
      dispatch(setAuth(DataVerified));
      navigate('/', { replace: true });
    }
    if (errorVerified && 'data' in errorVerified) {
      const errorData = errorVerified.data as { message: string };
      dispatch(
        setVisibleAlertModal({
          status: 'failed',
          message: `Failed: ${errorData}`,
        })
      );
    }
  }, [
    verifiedEmail,
    dispatch,
    navigate,
    isSuccessVerified,
    isLoadingVerified,
    statusVerified,
    errorVerified,
  ]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 1,
        }
      );
    });
    return () => {
      ctx.revert();
    };
  }, []);
  if (user.isVerified) {
    return <Navigate to='/not-found' replace />;
  }
  return (
    <main className='bg-lightGray'>
      <form
        ref={formRef}
        className='bg-white absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[8px]'
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
          <button
            className='mr-auto text-[#1877f2]'
            onClick={handleResendEmail}
          >
            Send Email Again
          </button>
        </div>
        <div className='flex justify-end p-4'>
          <button
            className={`${
              !code || statusResend === 'pending'
                ? 'bg-lightGray'
                : 'bg-[#1877f2]'
            } text-white w-[145px] h-[36px] rounded-[4px]`}
            disabled={!code || statusResend === 'pending'}
            onClick={handleVerified}
          >
            {statusResend === 'pending' ? '...Loading' : 'Continue'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default VerifiedAccount;
