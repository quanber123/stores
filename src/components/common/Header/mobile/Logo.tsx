import logo from '@/assets/images/logo-01.png.webp';
import { useNavigate } from 'react-router-dom';
function Logo() {
  const navigate = useNavigate();
  return (
    <img
      className='w-[120px] h-full object-contain cursor-pointer'
      src={logo}
      alt='logo'
      onClick={() => navigate('/')}
      {...({ fetchpriority: 'low' } as React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >)}
    />
  );
}

export default Logo;
