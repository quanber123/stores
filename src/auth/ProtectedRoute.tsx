import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';
type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    } else if (user.id && !user?.verified) {
      navigate('/verified');
    } else {
      navigate('/not-found', { replace: true });
    }
  }, [navigate, user]);

  return children;
}
