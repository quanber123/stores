import { FaAnglesUp } from '@/assets/icons/index';
import { useEffect, useState } from 'react';
import scrollElement from '@/utils/scroll-elements';
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
      className='fixed bottom-[10%] right-[5%] z-[500] w-[50px] h-[50px] bg-purple hover:bg-semiBoldGray flex justify-center items-center rounded-full'
      style={{ scale: `${btnFixed ? '1' : '0'}` }}
      onClick={scrollElement}
    >
      <FaAnglesUp className='text-white' />
    </button>
  );
}

export default Scroll;
