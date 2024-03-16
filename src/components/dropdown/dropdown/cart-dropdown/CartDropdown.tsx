import { FaCartShopping } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { DropdownContext } from '../../hooks/dropdownContext';
import { getAllCarts } from '@/services/redux/slice/authSlice';
import { capitalizeFirstLetter } from '@/services/utils/format';
import cartImg from '@/assets/images/cart.png';
import LazyLoadImage from '@/services/utils/lazyload-image';
import './CartDropdown.css';
function CartDropdown() {
  const { state, setVisibleDropdown } = useContext(DropdownContext);
  const navigate = useNavigate();
  const cart = useSelector(getAllCarts);
  const handleCheckCart = () => {
    if (window.innerWidth > 640) {
      setVisibleDropdown('visibleCartDropdown');
    } else {
      navigate('/cart');
    }
  };
  const redirectCart = () => {
    setVisibleDropdown('visibleCartDropdown');
    navigate('/cart');
  };
  const renderedCart = useMemo(() => {
    return cart.cart.map((c) => {
      return (
        <article
          key={c._id}
          className='text-semiBoldGray flex items-center gap-[20px]'
        >
          <div className='relative rounded-[12px] overflow-hidden'>
            <LazyLoadImage
              src={c.product.image}
              alt={c.product.name}
              className='w-[150px] h-[80px]'
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <h3 className='font-bold'>
              {capitalizeFirstLetter(c.product.name)}
            </h3>
            <p>Size: {c.product?.size}</p>
            <p>Color: {c.product?.color}</p>
          </div>
        </article>
      );
    });
  }, [cart.cart]);
  return (
    <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
      <button className='flex items-center gap-[20px]'>
        <FaCartShopping
          className='text-lg hover:text-purple transition-colors cursor-pointer'
          onClick={handleCheckCart}
        />
        <p className='block tablet:hidden font-bold'>Your Cart</p>
        {cart.total ? (
          <span className='hidden tablet:flex absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] justify-center items-center z-10 bg-purple text-white'>
            {cart.total}
          </span>
        ) : (
          <></>
        )}
      </button>
      <div
        className={`cart-modal ${state.visibleCartDropdown ? 'active' : ''}`}
      >
        <h3 className='pl-[16px] text-md text-semiBoldGray font-bold'>
          Your Cart
        </h3>
        <div className='flex-1 pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-auto'>
          {cart.cart.length ? (
            renderedCart
          ) : (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[10px]'>
              <LazyLoadImage
                className='w-[100px] h-[100px] rounded-[2px]'
                src={cartImg}
                alt='cart-img'
              />
              <p className='font-bold'>No products yet.</p>
            </div>
          )}
        </div>
        {cart.cart.length > 0 && (
          <div className='pr-[16px] my-4 flex justify-end'>
            <button
              className='h-[42px] px-4 bg-purple hover:bg-darkGray text-white rounded-[4px]'
              onClick={redirectCart}
            >
              View your cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDropdown;
