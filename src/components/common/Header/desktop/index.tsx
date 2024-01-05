import { useRef, useLayoutEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import Router from './Route';
import Logo from './Logo';
const CartModal = lazy(() => import('@/components/modal/cart-modal/CartModal'));
const FavoriteModal = lazy(
  () => import('@/components/modal/favorite-modal/FavoriteModal')
);
const NotificationsModal = lazy(
  () => import('@/components/modal/notifications-modal/NotificationsModal')
);
const UserModal = lazy(() => import('@/components/modal/user-modal/UserModal'));
const LoginModal = lazy(
  () => import('@/components/modal/login-modal/LoginModal')
);
const RegisterModal = lazy(
  () => import('@/components/modal/register-modal/RegisterModal')
);
function DesktopNavBar() {
  const user = useSelector(authInfo);
  const imgRef = useRef(null);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        {
          translateX: -200,
          opacity: 0,
        },
        {
          translateX: 0,
          opacity: 1,
          duration: 0.5,
        }
      );
      routeRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          {
            y: -100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.3 + 0.3,
            ease: 'bounce.out',
          }
        );
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <nav className='container h-[60px] flex justify-start items-center gap-[80px]'>
      <Logo imgRef={imgRef} />
      <Router routeRefs={routeRefs} />
      {user.email ? (
        <Suspense>
          <div className='ml-auto flex items-center gap-[20px]'>
            <CartModal />
            <FavoriteModal />
            <NotificationsModal />
            <UserModal />
          </div>
        </Suspense>
      ) : (
        <Suspense>
          <div className='ml-auto flex items-center gap-[20px]'>
            <LoginModal />
            <RegisterModal />
          </div>
        </Suspense>
      )}
    </nav>
  );
}

export default DesktopNavBar;
