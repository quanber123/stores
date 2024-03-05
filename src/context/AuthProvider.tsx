import { createContext, PropsWithChildren, useContext } from 'react';
import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
const AuthContext = createContext<any | null>(null);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const user = useSelector(authInfo);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const user = useContext(AuthContext);
  if (user === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return user;
};
