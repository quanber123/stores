import { useState, useEffect } from 'react';
import logo from '@/assets/images/logo-01.png.webp';
import { NavLink, Link } from 'react-router-dom';
function Header() {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const stickyFunc = () => {
      if (window.pageYOffset > 150) {
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
  return (
    <nav className={`${sticky ? 'active' : ''}`}>
      <section className={`container flex items-center  gap-[80px]`}>
        <div>
          <Link to={`/`}>
            {' '}
            <img className='h-full' src={logo} alt='logo' />
          </Link>
        </div>
        <ul className='flex items-center gap-[20px] text-sm font-bold'>
          <li>
            <NavLink
              to={`about`}
              className={({ isActive }) => (isActive ? 'text-purple' : '')}
              end
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`shop`}
              className={({ isActive }) => (isActive ? 'text-purple' : '')}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`blog`}
              className={({ isActive }) => (isActive ? 'text-purple' : '')}
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Header;
