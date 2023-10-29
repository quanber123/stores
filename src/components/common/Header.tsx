import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { NavLink, Link } from 'react-router-dom';
import scrollElement from '@/utils/scroll-elements';
import gsap from 'gsap';
function Header() {
  const [sticky, setSticky] = useState(false);
  const imgRef = useRef(null);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const stickyFunc = () => {
      if (window.pageYOffset > 75) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', stickyFunc);
    return () => {
      window.removeEventListener('scroll', stickyFunc);
    };
  }, []);
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
  const routes = [
    {
      link: 'about',
    },
    {
      link: 'shop',
    },
    { link: 'blog' },
  ];
  const route = routes.map((r, index) => {
    return (
      <li
        key={index}
        className='capitalize'
        ref={(el) => (routeRefs.current[index] = el)}
      >
        <NavLink
          to={r.link}
          className={({ isActive }) => (isActive ? 'text-purple' : '')}
          onClick={scrollElement}
          end
        >
          {r.link}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className={`${sticky ? 'active' : ''}`}>
      <section className={`container flex items-center  gap-[80px]`}>
        <div>
          <Link to={`/`}>
            <img ref={imgRef} className='h-full' src={logo} alt='logo' />
          </Link>
        </div>
        <ul className='flex items-center gap-[20px] text-sm font-bold'>
          {route}
        </ul>
      </section>
    </nav>
  );
}

export default Header;
