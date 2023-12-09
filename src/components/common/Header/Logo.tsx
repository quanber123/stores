import logo from '@/assets/images/logo-01.png.webp';
import { useNavigate } from 'react-router-dom';
type PropsLogo = {
  imgRef: any;
};
function Logo({ imgRef }: PropsLogo) {
  const navigate = useNavigate();
  return (
    <img
      ref={imgRef}
      className='w-[150px] h-full object-contain cursor-pointer'
      src={logo}
      alt='logo'
      onClick={() => navigate('/')}
    />
  );
}

export default Logo;
