import { FaAnglesUp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import scrollElement from '@/services/utils/scroll-elements';
function Scroll() {
  const [btnFixed, setBtnFixed] = useState(false);
  useEffect(() => {
    const setFixed = () => {
      if (window.pageYOffset > 250) {
        setBtnFixed(true);
      } else {
        setBtnFixed(false);
      }
    };
    window.addEventListener('scroll', setFixed);
    return () => {
      window.removeEventListener('scroll', setFixed);
    };
  }, []);
  return (
    <button
      className='fixed bottom-[10%] right-[5%] z-50 w-[50px] h-[50px] bg-semiBoldGray hover:bg-purple flex justify-center items-center rounded-full'
      style={{ scale: `${btnFixed ? '1' : '0'}` }}
      onClick={scrollElement}
      aria-label='ScrollToTop'
    >
      <FaAnglesUp className='text-white' />
    </button>
  );
}

export default Scroll;
