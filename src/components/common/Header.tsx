import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { NavLink, Link } from 'react-router-dom';
import scrollElement from '@/utils/scroll-elements';
import gsap from 'gsap';
import './Header.css';
function Header() {
  const [sticky, setSticky] = useState(false);
  const [dropdownHeader, setDropdownHeader] = useState(false);
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
  const handleDropdown = useCallback(() => {
    setDropdownHeader((prevState) => (prevState = !prevState));
  }, [dropdownHeader]);
  const changeRoute = () => {
    handleDropdown();
    scrollElement();
  };
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
    // {
    //   link: 'contact',
    // },
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
          className={({ isActive }) =>
            isActive ? 'text-purple w-max' : 'w-max'
          }
          onClick={changeRoute}
          end
        >
          {r.link}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className={`${sticky ? 'active' : ''}`}>
      <section
        className={`container flex justify-between tablet:justify-start items-center  gap-[80px]`}
      >
        <div>
          <Link to={`/`}>
            <img
              ref={imgRef}
              className='max-w-[150px] h-full'
              src={logo}
              alt='logo'
            />
          </Link>
        </div>
        <div
          className='tablet:hidden relative m-auto w-[32px] h-[48px] cursor-pointer z-10 flex flex-col items-center justify-center'
          onClick={handleDropdown}
        >
          <span className={`bars ${dropdownHeader ? 'active' : ''}`}></span>
          <span className={`bars ${dropdownHeader ? 'active' : ''}`}></span>
          <span className={`bars ${dropdownHeader ? 'active' : ''}`}></span>
        </div>
        <div className={`routes ${dropdownHeader ? `active` : ''}`}>
          <ul className='p-[16px] h-max'>{route}</ul>
        </div>
      </section>
    </nav>
  );
}

export default Header;
