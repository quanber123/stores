import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DropdownContext } from '../../hooks/dropdownContext';
import './CartDropdown.css';
import { useGetAllCartsQuery } from '@/services/redux/features/productFeatures';
import { getAllCarts, setAllCarts } from '@/services/redux/slice/productSlice';
import { capitalizeFirstLetter } from '@/services/utils/format';
function CartDropdown() {
  const { state, setVisibleDropdown } = useContext(DropdownContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(getAllCarts);
  const { data: cartsData, isSuccess: isSuccessCart } =
    useGetAllCartsQuery(null);
  useEffect(() => {
    if (isSuccessCart) {
      dispatch(setAllCarts(cartsData));
    }
  });
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
  const renderedCart = cart?.cart?.map((c) => {
    return (
      <article
        key={c._id}
        className='text-semiBoldGray flex items-center gap-[20px]'
      >
        <div className='relative rounded-[12px] overflow-hidden'>
          <img className='w-[150px] h-[80px]' src={c.product.image} alt='' />
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h3 className='font-bold'>{capitalizeFirstLetter(c.product.name)}</h3>
          <p>Size: {c.product.size}</p>
          <p>Color: {c.product.color}</p>
        </div>
      </article>
    );
  });
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
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-purple font-bold text-xl text-center'>
              No Product In Your Cart
            </p>
          )}
        </div>
        <div className='pr-[16px] my-4 flex justify-end'>
          <button
            className='h-[42px] px-4 bg-purple hover:bg-black text-white rounded-[4px]'
            onClick={redirectCart}
          >
            View your cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDropdown;
