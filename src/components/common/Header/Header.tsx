import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import gsap from 'gsap';
import './Header.css';
import Router from './Route';
import Logo from './Logo';
import Bars from './Bars';
import Buttons from './Buttons';
function Header() {
  const [sticky, setSticky] = useState(false);
  const [dropdownRoutes, setDropdownRoutes] = useState(false);
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
  const handleDropdownRoutes = useCallback(() => {
    setDropdownRoutes((prevState) => (prevState = !prevState));
  }, [dropdownRoutes]);
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
    <header className={`${sticky ? 'active' : ''} text-sm`}>
      <nav className='container relative flex justify-start items-center gap-[20px] tablet:gap-[80px]'>
        <Logo imgRef={imgRef} />
        <div className='flex items-center'>
          <div
            className={`routes ${
              dropdownRoutes ? `active` : ''
            } flex items-center gap-[20px]`}
          >
            <Router
              handleDropdownRoutes={handleDropdownRoutes}
              routeRefs={routeRefs}
            />
          </div>
        </div>
        <Buttons />
        <Bars
          handleDropdownRoutes={handleDropdownRoutes}
          dropdownRoutes={dropdownRoutes}
        />
      </nav>
    </header>
  );
}

export default Header;
