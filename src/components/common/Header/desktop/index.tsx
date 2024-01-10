import { useRef, useLayoutEffect, Suspense, lazy, useContext } from 'react';
import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
import gsap from 'gsap';
import Router from './Route';
import Logo from './Logo';
import { GlobalModalContext } from '@/components/modal/global/hooks/globalContext';
const CartModal = lazy(
  () => import('@/components/dropdown/dropdown/cart-modal/CartModal')
);
const FavoriteModal = lazy(
  () => import('@/components/dropdown/dropdown/favorite-modal/FavoriteModal')
);
const NotificationsModal = lazy(
  () =>
    import(
      '@/components/dropdown/dropdown/notifications-modal/NotificationsModal'
    )
);
const UserModal = lazy(
  () => import('@/components/dropdown/dropdown/user-modal/UserModal')
);
const LoginModal = lazy(
  () => import('@/components/modal/global/modal/login-modal/LoginModal')
);
const RegisterModal = lazy(
  () => import('@/components/modal/global/modal/register-modal/RegisterModal')
);
function DesktopNavBar() {
  const { setVisibleModal } = useContext(GlobalModalContext);
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
            <UserModal user={user} />
          </div>
        </Suspense>
      ) : (
        <Suspense>
          <div className='ml-auto flex items-center gap-[20px]'>
            <button
              className='ml-auto hidden tablet:block font-bold'
              onClick={() => setVisibleModal('visibleLoginModal')}
            >
              Login
            </button>
            <button
              className='px-5 py-2 font-bold bg-darkGray text-white hover:bg-purple rounded-[28px]'
              onClick={() => setVisibleModal('visibleRegisterModal')}
            >
              Register
            </button>
          </div>
          <LoginModal />
          <RegisterModal />
        </Suspense>
      )}
    </nav>
  );
}

export default DesktopNavBar;
