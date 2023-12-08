import logo from '@/assets/images/logo-01.png.webp';
import { Link } from 'react-router-dom';
type PropsLogo = {
  imgRef: any;
};
function Logo({ imgRef }: PropsLogo) {
  return (
    <Link to={`/`}>
      <img
        ref={imgRef}
        className='w-[150px] h-full object-cover'
        src={logo}
        alt='logo'
      />
    </Link>
  );
}

export default Logo;
