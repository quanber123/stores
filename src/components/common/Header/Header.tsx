import { useEffect, useState } from 'react';
import DesktopNavBar from './desktop';
import MobileNavBar from './mobile';
import './Header.css';
function Header() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='fixed w-full bg-white z-[999] flex justify-center items-center text-sm'>
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
    </header>
  );
}

export default Header;
