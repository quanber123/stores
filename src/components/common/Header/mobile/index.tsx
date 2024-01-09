// import { FaRightToBracket } from 'react-icons/fa6';
import Bars from './Bars';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
import NotificationsModal from '@/components/dropdown/dropdown/notifications-modal/NotificationsModal';
function MobileNavBar() {
  const user = useSelector(authInfo);
  return (
    <nav className='container relative h-[60px] flex justify-between items-center gap-[20px]'>
      <Bars />
      <Logo />
      {user ? <NotificationsModal /> : <></>}
    </nav>
  );
}

export default MobileNavBar;
