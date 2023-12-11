import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import { FaHeart, FaCartShopping } from 'react-icons/fa6';
function User() {
  const user = useSelector(authInfo);
  return user.username && user.imageSrc ? (
    <div>
      {/* <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
        <FaHeart className='text-lg' />
        <span className='absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] flex justify-center items-center z-10 bg-purple text-white'>
          10
        </span>
      </div> */}
      <img
        className='w-[32px] h-[32px] rounded-full cursor-pointer'
        src={user.imageSrc}
        alt={user.username}
      />
    </div>
  ) : (
    <></>
  );
}

export default User;
