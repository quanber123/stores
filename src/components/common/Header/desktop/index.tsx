import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import Router from './Route';
import Logo from './Logo';
import Buttons from './Buttons';
import NotificationsModal from '@/components/modal/notifications-modal/NotificationsModal';
import FavoriteModal from '@/components/modal/favorite-modal/FavoriteModal';
import LoginModal from '@/components/modal/login-modal/LoginModal';
import RegisterModal from '@/components/modal/register-modal/RegisterModal';
import UserModal from '@/components/modal/user-modal/UserModal';
import CartModal from '@/components/modal/cart-modal/CartModal';
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
    <nav className='container relative h-[60px] flex justify-start items-center gap-[80px]'>
      <Logo imgRef={imgRef} />
      <Router routeRefs={routeRefs} />
      {user.email ? (
        <div className='ml-auto flex items-center gap-[20px]'>
          <CartModal />
          <FavoriteModal />
          <NotificationsModal />
          <UserModal />
        </div>
      ) : (
        <>
          <Buttons />
          <LoginModal />
          <RegisterModal />
        </>
      )}
    </nav>
  );
}

export default DesktopNavBar;
