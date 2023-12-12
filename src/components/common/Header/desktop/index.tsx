import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import Router from './Route';
import Logo from './Logo';
import Buttons from './Buttons';
import LoginModal from '@/components/modal/login/Login';
import RegisterModal from '@/components/modal/register/Register';
import User from './User';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
import NotificationsModal from '@/components/modal/notifications/Notifications';
import CartModal from '@/components/modal/cart/Cart';
import FavoriteModal from '@/components/modal/favourite/Favorite';
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
      {user ? (
        <div className='ml-auto flex items-center gap-[20px]'>
          <CartModal />
          <FavoriteModal />
          <NotificationsModal />
          <User />
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
