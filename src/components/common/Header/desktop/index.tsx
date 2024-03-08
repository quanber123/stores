import { useRef, useLayoutEffect, Suspense, lazy, useContext } from 'react';
import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
import gsap from 'gsap';
import Router from './Route';
import Logo from './Logo';
import { ModalContext } from '@/components/modal/hooks/modalContext';
const CartDropdown = lazy(
  () => import('@/components/dropdown/dropdown/cart-dropdown/CartDropdown')
);
const FavoriteDropdown = lazy(
  () =>
    import('@/components/dropdown/dropdown/favorite-dropdown/FavoriteDropdown')
);
const NotificationsModal = lazy(
  () =>
    import(
      '@/components/dropdown/dropdown/notifications-dropdown/NotificationsDropdown'
    )
);
const UserModal = lazy(
  () => import('@/components/dropdown/dropdown/user-dropdown/UserDropdown')
);
function DesktopNavBar() {
  const { setVisibleModal } = useContext(ModalContext);
  const user = useSelector(authInfo);
  const navRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        {
          translateY: -200,
          opacity: 0,
        },
        {
          translateY: 0,
          opacity: 1,
          duration: 0.5,
        }
      );
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <nav
      ref={navRef}
      className='container h-[60px] flex justify-start items-center gap-[80px]'
    >
      <Logo />
      <Router />
      {user.id ? (
        <Suspense>
          <div className='ml-auto flex items-center gap-[20px]'>
            <CartDropdown />
            <FavoriteDropdown />
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
        </Suspense>
      )}
    </nav>
  );
}

export default DesktopNavBar;
