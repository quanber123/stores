import { useCallback, useState } from 'react';
import Bars from './Bars';
import Logo from './Logo';
import './index.css';
import Route from './Route';
function MobileNavBar() {
  const [dropdownRoutes, setDropdownRoutes] = useState(false);
  const handleDropdownRoutes = useCallback(() => {
    setDropdownRoutes((prevState) => !prevState);
  }, []);
  return (
    <nav className='container relative h-[60px] flex justify-between items-center gap-[20px]'>
      <Logo />
      <Bars
        dropdownRoutes={dropdownRoutes}
        handleDropdownRoutes={handleDropdownRoutes}
      />
      <Route
        dropdownRoutes={dropdownRoutes}
        handleDropdownRoutes={handleDropdownRoutes}
      />
    </nav>
  );
}

export default MobileNavBar;
