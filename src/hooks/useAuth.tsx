import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
import { User } from '@/interfaces/interfaces';
export const useAuth = () => {
  const user = useSelector(authInfo);
  // if (user === null) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }
  return user as User;
};
