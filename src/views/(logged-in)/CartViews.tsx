import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SetHeader from '@/services/utils/set-header';
import Breadcrumbs from '@/components/(ui)/breadcrumbs/Breadcrumbs';
import CartList from '@/components/pages/(logged-in)/cart/CartList';

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
    <>
      <SetHeader title={location.pathname} isBlockIndex={true} />
      <main ref={layoutRef} className='gap-[20px]'>
        <Breadcrumbs breadcrumbs={location.pathname} />
        <section className='container'>
          <CartList />
        </section>
      </main>
    </>
  );
}

export default CartViews;
