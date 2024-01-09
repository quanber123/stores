import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import CartList from '@/components/pages/auth/cart/CartList';
import CartTotals from '@/components/pages/auth/cart/CartTotals';

function CartViews() {
  const location = useLocation();
  const layoutRef = useRef(null);
  useLayoutEffect(() => {
    if (layoutRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          layoutRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        );
      });
      return () => {
        ctx.revert();
      };
    }
  }, []);
  return (
    <main ref={layoutRef} className='gap-[80px]'>
      <Breadcrumbs breadcrumbs={location.pathname} />
      <section className='container flex justify-between gap-[40px]'>
        <CartList />
        <CartTotals />
      </section>
    </main>
  );
}

export default CartViews;
