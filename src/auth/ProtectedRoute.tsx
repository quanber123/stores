import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/not-found', { replace: true });
    } else if (user?.id && !user?.isVerified) {
      navigate('/verified');
    }
  }, [navigate, user]);

  return children;
}
