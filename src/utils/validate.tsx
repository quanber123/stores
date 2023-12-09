import { FaCheck, FaXmark } from 'react-icons/fa6';

export function validateEmail(email: string) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Kiểm tra mật khẩu có đủ dài và chứa ít nhất một chữ cái in hoa
  const regex = /^(?=.*[A-Z]).{6,}$/;
  return regex.test(password);
}

export function ErrValidate({ message }: { message: string }) {
  return (
    <div className='font-bold text-sm'>
      <p className='absolute -bottom-1/2 text-red'>{message}</p>
      <span className='absolute top-1/2 right-[10px] -translate-y-1/2 bg-red text-white w-[24px] h-[24px] flex justify-center items-center rounded-full'>
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
