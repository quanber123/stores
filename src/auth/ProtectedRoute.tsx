import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';
type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.user === null) {
      navigate('/not-found', { replace: true });
    }
    if (user.user.id && !user.user?.isVerified) {
      navigate('/verified');
    }
  }, [navigate, user.user]);

  return children;
}
