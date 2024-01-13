import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAllCarts } from '@/services/redux/slice/productSlice';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '@/services/utils/format';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteCartByIdMutation,
  useUpdateCartMutation,
} from '@/services/redux/features/productFeatures';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useDebounce } from '@/hooks/useDebounce';
import { accessToken } from '@/services/redux/slice/authSlice';
import { Cart } from '@/interfaces/interfaces';
function CartList() {
  const { setVisibleModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const token = useSelector(accessToken);
  const cart = useSelector(getAllCarts);
  const [quantity, setQuantity] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  useEffect(() => {
    setQuantity(cart.cart.map((c) => c.product.quantity));
  }, [cart.cart]);
  const [deleteCartById] = useDeleteCartByIdMutation();
  const [updatedCart, { isSuccess: isSuccessUpdateCart }] =
    useUpdateCartMutation();
  const [indexCart, setIndexCart] = useState<number | null>(null);
  const debouncedCart = useDebounce(indexCart, 1000);
  const handleChangeQuantity = useCallback(
    (index: number, action: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = [...quantity];

      switch (action) {
        case 'increment': {
          newQuantity[index]++;
          break;
        }
        case 'decrement': {
          newQuantity[index] > 0 && newQuantity[index]--;
          break;
        }
        case 'input': {
          const inputValue = parseInt(e.target.value) || 1;
          newQuantity[index] = inputValue > 1 ? inputValue : 1;
          break;
        }
        default:
          break;
      }
      setIndexCart(index);
      setQuantity(newQuantity);
    },
    [quantity]
  );
  useEffect(() => {
    if (debouncedCart !== null) {
      updatedCart({
        token: token,
        id: cart.cart[debouncedCart]._id,
        product: {
          ...cart.cart[debouncedCart].product,
          quantity: quantity[debouncedCart],
        },
      });
    }
  }, [debouncedCart]);
  useEffect(() => {
    if (isSuccessUpdateCart) {
      setIndexCart(null);
    }
  }, [isSuccessUpdateCart]);
  const handleDeleteCartById = useCallback(
    (id: string) => {
      setVisibleModal({
        visibleConfirmModal: {
          message: 'Do you want to delete this product?',
          function: () => deleteCartById({ token, id }),
        },
      });
    },
    [deleteCartById]
  );
  const handleSelectedProduct = useCallback(
    (id: string) => {
      setSelectedProduct((prevSelectedProducts) => {
        const isSelected = prevSelectedProducts.includes(id);
        let newSelectedProducts;

        if (isSelected) {
          newSelectedProducts = prevSelectedProducts.filter(
            (productId) => productId !== id
          );
        } else {
          newSelectedProducts = [...prevSelectedProducts, id];
        }
        setIsSelectedAll(newSelectedProducts.length === cart.cart.length);
        return newSelectedProducts;
      });
    },
    [cart]
  );
  const handleSelectAll = useCallback(() => {
    if (isSelectedAll) {
      setSelectedProduct([]);
    } else {
      setSelectedProduct(cart.cart.map((c) => c._id));
    }
    setIsSelectedAll((prevState) => !prevState);
  }, [isSelectedAll, selectedProduct]);
  const renderedCart = useMemo(() => {
    return cart.cart.map((c, index) => {
      return (
        <div
          key={c._id}
          className='flex justify-start items-center gap-[20px] text-sm overflow-hidden'
        >
          <div className='w-1/12 flex justify-center'>
            <input
              className='w-[18px] h-[18px] cursor-pointer'
              type='checkbox'
              value={c._id}
              checked={selectedProduct.includes(c._id)}
              onChange={() => handleSelectedProduct(c._id)}
              aria-label={`checkbox-${c.product.name}`}
            />
          </div>
          <div
            className='flex flex-1 items-center gap-[10px] cursor-pointer'
            onClick={() => navigate(`/shop/${c.product.id}`)}
          >
            <img
              className='w-[80px] h-[80px] rounded-[2px]'
              src={c.product.image}
              alt=''
            />
            <p>{capitalizeFirstLetter(c.product.name)}</p>
          </div>
          <p className='w-1/12 text-center'>{c.product.color}</p>
          <p className='w-1/12 text-center'>{c.product.size}</p>
          <p className='w-[96px] flex justify-center gap-[10px]'>
            <span
              className={`${c.product.salePrice > 0 ? 'line-through' : ''}`}
            >
              {c.product.price}
            </span>
            {c.product.salePrice > 0 && (
              <span className='font-bold'>{c.product.salePrice}</span>
            )}
          </p>
          <div className='w-1/6 flex justify-between border border-lightGray'>
            <button
              className='w-[52px] flex justify-center items-center text-lg'
              onClick={(e) =>
                handleChangeQuantity(index, 'decrement', e as any)
              }
            >
              -
            </button>
            <input
              className='w-[52px] flex-1 text-center py-2 border-l border-r border-l-lightGray border-r-lightGray focus:outline-none'
              type='text'
              pattern='\d+'
              value={quantity[index]}
              onChange={(e) => handleChangeQuantity(index, 'input', e)}
            />
            <button
              className='w-[52px] flex justify-center items-center text-lg'
              onClick={(e) =>
                handleChangeQuantity(index, 'increment', e as any)
              }
            >
              +
            </button>
          </div>
          <p className='w-1/12 text-center text-red font-bold overflow-hidden'>
            ${c.product.totalPrice}
          </p>
          <button
            className='w-1/12 hover:text-purple font-bold'
            onClick={() => handleDeleteCartById(c._id)}
          >
            Delete
          </button>
        </div>
      );
    });
  }, [cart, quantity, selectedProduct]);
  return (
    <div className='w-full py-8 border border-lightGray flex flex-col gap-[30px]'>
      <div className='p-2 flex justify-between gap-[20px] text-sm font-bold'>
        <div className='w-1/12 flex justify-center'>
          <input
            className='w-[18px] h-[18px] cursor-pointer'
            type='checkbox'
            checked={isSelectedAll}
            onChange={handleSelectAll}
            aria-label={`select-all`}
          />
        </div>
        <h3 className='flex-1 text-center'>Product</h3>
        <h3 className='w-1/12 text-center'>Color</h3>
        <h3 className='w-1/12 text-center'>Size</h3>
        <h3 className='w-[96px] text-center'>Price</h3>
        <h3 className='w-1/6 text-center'>Quantity</h3>
        <h3 className='w-1/12 text-center'>Total</h3>
        <h3 className='w-1/12 text-center'>Action</h3>
      </div>
      <div className='p-2 flex flex-col gap-[20px]'>{renderedCart}</div>
    </div>
  );
}

export default CartList;
