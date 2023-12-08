import { useState } from 'react';
import { FaUser, FaXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import scrollElement from '@/utils/scroll-elements';
function User() {
  const navigate = useNavigate();
  const [userSlide, setUserSlide] = useState(false);
  const user = useSelector(authInfo);
  const handleUserSlide = () => {
    setUserSlide((prevState) => !prevState);
  };
  const handleLogin = () => {
    setUserSlide((prevState) => !prevState);
    navigate('/login');
    scrollElement();
  };
  return (
    <div className='user px-[16px] flex items-center gap-[20px]'>
      <button
        className='btn-user text-[20px]'
        aria-label='btn-user'
        onClick={handleUserSlide}
      >
        <FaUser />
      </button>
      <div className={`user-slide-container ${userSlide ? 'active' : ''}`}>
        <div className='user-slide'>
          <div className='py-4 px-8 h-[68px] bg-black text-white flex items-center gap-[20px]'>
            {user && user.imageSrc && user.username ? (
              <img
                className='w-[32px] h-[32px] rounded-full border-2 border-white'
                src={user.imageSrc}
                alt={user.username}
              />
            ) : (
              <div className='bg-white text-black rounded-full border-8 border-white flex justify-center items-center'>
                <FaUser className='text-md' />
              </div>
            )}
            <div>
              {user && user?.username?.length ? (
                <>
                  <h2>{user.name}</h2>
                  <p>
                    {user.username.length > 20
                      ? `${user.username?.substring(0, 21)}...`
                      : user.username}
                  </p>
                </>
              ) : (
                <>
                  <h2>Account</h2>
                  <button className='text-sm' onClick={handleLogin}>
                    Login
                  </button>
                </>
              )}
            </div>
            <div className='absolute top-2 right-4'>
              <button
                className='text-lg'
                aria-label='close-user-slide'
                onClick={handleUserSlide}
              >
                <FaXmark />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
