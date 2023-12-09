import { useState, useEffect, useCallback } from 'react';
import './Header.css';
import DesktopNavBar from './desktop';
// import Router from './desktop/Route';
// import Logo from './desktop/Logo';
// import Bars from './desktop/Bars';
// import Buttons from './desktop/Buttons';
// import LoginModal from '@/components/modal/login/Login';
// import RegisterModal from '@/components/modal/register/Register';
function Header() {
  const [sticky, setSticky] = useState(false);
  const [dropdownRoutes, setDropdownRoutes] = useState(false);
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
  return (
    <header className={`${sticky ? 'active' : ''} text-sm`}>
      {/* <nav className='container relative flex justify-start items-center gap-[20px] tablet:gap-[80px]'>
        <Logo imgRef={imgRef} />
        <div className='flex items-center'>
          <div
            className={`routes ${
              dropdownRoutes ? `active` : ''
            } flex items-center gap-[20px]`}
          >
            <Router routeRefs={routeRefs} />
          </div>
        </div>
        <Buttons />
        <Bars
          handleDropdownRoutes={handleDropdownRoutes}
          dropdownRoutes={dropdownRoutes}
        />
      </nav>
      <LoginModal />
      <RegisterModal /> */}
      <DesktopNavBar />
    </header>
  );
}

export default Header;
