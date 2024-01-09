import { FaCartShopping, FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getCart, removeFormCart } from '@/services/redux/slice/cartSlice';
import { DropdownContext } from '../../hooks/dropdownContext';
import './CartModal.css';
import { GlobalModalContext } from '@/components/modal/global/hooks/globalContext';
function CartModal() {
  const { setVisibleModal } = useContext(GlobalModalContext);
  const { state, setVisibleDropdown } = useContext(DropdownContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const [removeItem, setRemoveItem] = useState<string | null>(null);
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
  const handleRemoveCart = (_id: string, price: number) => {
    dispatch(
      removeFormCart({
        _id: _id,
        price: price,
      })
    );
    setVisibleModal({
      visibleAlertModal: {
        status: 'success',
        message: 'Success: Deleted Product!',
      },
    });
  };
  const renderedCart = cart?.map((c) => {
    return (
      <article
        key={c._id}
        className='text-semiBoldGray flex items-center gap-[20px]'
      >
        <div
          className='relative rounded-[12px] overflow-hidden'
          onMouseEnter={() => setRemoveItem(c._id)}
          onMouseLeave={() => setRemoveItem(null)}
        >
          <img className='w-[150px] h-[80px]' src={c.image} alt='' />
          <div
            className={`${
              c._id === removeItem ? 'w-full h-full' : 'w-0 h-0'
            } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg bg-overlayPurple flex justify-center items-center`}
            style={{ transition: 'all 0.3s ease' }}
          >
            <FaXmark
              className='cursor-pointer'
              onClick={() => handleRemoveCart(c._id, c.price)}
            />
          </div>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h3 className='font-bold'>{c.name}</h3>
          <p className='flex items-center gap-[10px]'>
            <span>Size: {c.size}</span>
            <span>Color: {c.color}</span>
          </p>
          <p>
            Quantity: <span className='font-bold'>{c.quantity}</span>
          </p>
          <p>
            Total Price: <span className='font-bold'>{c.totalPrice}$</span>
          </p>
        </div>
      </article>
    );
  });
  return (
    <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
      <div className='flex items-center gap-[20px]'>
        <FaCartShopping
          className='text-lg hover:text-purple transition-colors cursor-pointer'
          onClick={handleCheckCart}
        />
        <p className='block tablet:hidden font-bold'>Your Cart</p>
        {cart.length ? (
          <span className='hidden tablet:flex absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] justify-center items-center z-10 bg-purple text-white'>
            {cart.length}
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`cart-modal ${state.visibleCartDropdown ? 'active' : ''}`}
      >
        <div className='pl-[16px] pr-[32px] flex justify-between items-center'>
          <h3 className='text-md text-semiBoldGray font-bold'>Your Cart</h3>
          <button className='text-purple font-bold' onClick={redirectCart}>
            See all
          </button>
        </div>
        <div className='pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-y-auto'>
          {cart.length ? (
            renderedCart
          ) : (
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-purple font-bold text-xl text-center'>
              No Product In Your Cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;
