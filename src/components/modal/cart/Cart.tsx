import {
  getVisibleCartModal,
  setVisibleCartModal,
} from '@/store/slice/modalSlice';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import demoImg from '@/assets/images/product-detail-01.jpg.webp';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
function CartModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleCartModal);
  const handleCheckCart = () => {
    if (window.innerWidth > 640) {
      dispatch(setVisibleCartModal());
    } else {
      navigate('/cart');
    }
  };
  const redirectCart = () => {
    dispatch(setVisibleCartModal());
    navigate('/cart');
  };
  return (
    <>
      <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
        <div className='flex items-center gap-[20px]'>
          <FaCartShopping
            className='text-lg hover:text-purple transition-colors cursor-pointer'
            onClick={handleCheckCart}
          />
          <p className='block tablet:hidden font-bold'>Your Cart</p>
          <span className='hidden tablet:flex absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] justify-center items-center z-10 bg-purple text-white'>
            10
          </span>
        </div>
        <div className={`cart-modal ${visibleModal ? 'active' : ''}`}>
          <div className='pl-[16px] pr-[32px] flex justify-between items-center'>
            <h3 className='text-md text-semiBoldGray font-bold'>Your Cart</h3>
            <button className='text-purple font-bold' onClick={redirectCart}>
              See all
            </button>
          </div>
          <div className='pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-y-auto'>
            <article className='text-semiBoldGray flex gap-[20px]'>
              <img
                className='w-[150px] h-[80px] rounded-[12px]'
                src={demoImg}
                alt=''
              />
              <div className='flex flex-col gap-[5px]'>
                <h3 className='font-bold'>Esprit Ruffle Shirt</h3>
                <p className='flex items-center gap-[10px]'>
                  <span>Size: XL</span>
                  <span>Color: Red</span>
                </p>
                <p>
                  Price: <span className='font-bold'>18.00$</span>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartModal;
