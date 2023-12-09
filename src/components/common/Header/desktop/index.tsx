import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import Router from './Route';
import Logo from './Logo';
import Buttons from './Buttons';
import LoginModal from '@/components/modal/login/Login';
import RegisterModal from '@/components/modal/register/Register';
function DesktopNavBar() {
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
    <nav className='container relative flex justify-start items-center gap-[20px] tablet:gap-[80px]'>
      <Logo imgRef={imgRef} />
      <Router routeRefs={routeRefs} />
      <Buttons />
      <LoginModal />
      <RegisterModal />;
    </nav>
  );
}

export default DesktopNavBar;
