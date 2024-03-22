import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  if (!user) {
    return <Navigate to={'/not-found'} replace />;
  }
  if (user?.id && !user?.isVerified) {
    return <Navigate to={'/verified'} replace />;
  }
  return children;
}
