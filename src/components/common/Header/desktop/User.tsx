import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
function User() {
  const navigate = useNavigate();
  const [userSlide, setUserSlide] = useState(false);
  const user = useSelector(authInfo);
  return <div className='user px-[16px] flex items-center gap-[20px]'></div>;
}

export default User;
