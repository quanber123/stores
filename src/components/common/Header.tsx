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
import { FaUser, FaXmark } from '@/assets/icons';
import LoginByGoogle from '@/auth/LoginByGoogle';
import { useSelector } from 'react-redux';
import { authInfo } from '@/store/slice/authSlice';
function Header() {
  const [sticky, setSticky] = useState(false);
  const [dropdownRoutes, setDropdownRoutes] = useState(false);
  const [userSlide, setUserSlide] = useState(false);
  const imgRef = useRef(null);
  const routeRefs = useRef<Array<HTMLElement | null>>([]);
  const user = useSelector(authInfo);
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
  const handleUserSlide = useCallback(() => {
    setDropdownRoutes(false);
    setUserSlide((prevState) => !prevState);
  }, [userSlide]);
  const changeRoute = () => {
    handleDropdownRoutes();
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
        className={`container flex justify-between items-center  gap-[80px]`}
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
          className={`routes ${
            dropdownRoutes ? `active` : ''
          } flex items-center gap-[20px]`}
        >
          <ul className='p-[16px] h-max'>{route}</ul>
          <div className='user px-[16px] flex items-center gap-[20px]'>
            <button
              className='btn-user text-[20px]'
              aria-label='btn-user'
              onClick={handleUserSlide}
            >
              <FaUser />
            </button>
            <p className='tablet:hidden font-bold'>Account</p>
            <div
              className={`user-slide-container ${userSlide ? 'active' : ''}`}
            >
              <div className='user-slide'>
                <div className='py-4 px-8 h-[68px] bg-black text-white flex items-center gap-[20px]'>
                  {user && user.user.imageSrc && user.user.username ? (
                    <img
                      className='w-[32px] rounded-full border-2 border-white'
                      src={user.user.imageSrc}
                      alt={user.user.username}
                    />
                  ) : (
                    <div className='bg-white text-black rounded-full border-8 border-white flex justify-center items-center'>
                      <FaUser className='text-md' />
                    </div>
                  )}
                  <div>
                    {user && user?.user?.username?.length ? (
                      <>
                        <h2>{user.user.name}</h2>
                        <p>
                          {user.user.username.length > 20
                            ? `${user.user.username?.substring(0, 21)}...`
                            : user.user.username}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2>Account</h2>
                        <button className='text-sm'>Login</button>
                      </>
                    )}
                  </div>
                  <div className='absolute top-2 right-4'>
                    <button
                      className='text-lg'
                      aria-label='close-user-slide'
                      onClick={handleUserSlide}
                    >
                      <FaXmark />
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <LoginByGoogle />
        </div>
        <div
          className={`tablet:hidden relative ${
            userSlide ? 'z-0' : 'z-10'
          } m-auto w-[32px] h-[48px] cursor-pointer flex flex-col items-center justify-center`}
          onClick={handleDropdownRoutes}
        >
          <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
          <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
          <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
        </div>
      </section>
    </nav>
  );
}

export default Header;
