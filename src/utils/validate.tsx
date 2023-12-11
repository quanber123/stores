import { FaCheck, FaXmark } from 'react-icons/fa6';

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  const regex = /^(?=.*[A-Z]).{6,}$/;
  return regex.test(password);
}

export function ErrValidate({ message }: { message: string }) {
  return (
    <div className='absolute top-1/2 right-[10px] -translate-y-1/2 font-bold text-sm flex items-center gap-[10px]'>
      <p className='text-red'>{message}</p>
      <span className=' bg-red text-white w-[24px] h-[24px] flex justify-center items-center rounded-full'>
        <FaXmark className='text-md' />
      </span>
    </div>
  );
}

export function SuccessValidate() {
  return (
    <div className='bg-green text-white absolute top-1/2 -translate-y-1/2 right-[10px] w-[24px] h-[24px] flex justify-center items-center rounded-full'>
      <FaCheck />
    </div>
  );
}
