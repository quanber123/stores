import logo from '@/assets/images/logo-01.png.webp';
import { useNavigate } from 'react-router-dom';
function Logo() {
  const navigate = useNavigate();
  return (
    <img
      className='object-contain cursor-pointer'
      height='100%'
      width='150px'
      src={logo}
      alt='logo'
      onClick={() => navigate('/')}
      {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >)}
    />
  );
}

export default Logo;
