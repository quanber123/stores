import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Cart } from '@/interfaces/interfaces';
import { capitalizeFirstLetter } from '@/services/utils/format';
import { useCreatePaymentMutation } from '@/services/redux/features/productFeatures';
import { useDispatch, useSelector } from 'react-redux';
import {
  accessToken,
  getCurrAddress,
  setCurrDelivery,
} from '@/services/redux/slice/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import LazyLoadImage from '@/services/utils/lazyload-image';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useGetAddressUserQuery } from '@/services/redux/features/userFeatures';
type Props = {
  orders: Cart[];
};
const CheckoutList: React.FC<Props> = ({ orders }) => {
  const token = useSelector(accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setVisibleModal } = useContext(ModalContext);
  const currAddress = useSelector(getCurrAddress);
  const [paymentMethod, setPaymentMethod] = useState(
    window.localStorage.getItem('cozastore-payment') || 'cash'
  );
  const message = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const { data: dataAddress, isSuccess: isSuccessAddress } =
    useGetAddressUserQuery(token, { skip: !token });
  const [
    createPayment,
    {
      data: dataPayment,
      isSuccess: isSuccessPayment,
      isLoading: isLoadingPayment,
    },
  ] = useCreatePaymentMutation();
  const addressUser = useMemo(
    () =>
      currAddress
        ? `${currAddress.address}, ${currAddress.district}, ${currAddress.city},${currAddress.state}`
        : '',
    [currAddress]
  );
  useEffect(() => {
    if (isSuccessAddress && dataAddress) {
      dispatch(setCurrDelivery(dataAddress[0]));
    }
  }, [isSuccessAddress, dataAddress]);
  const renderedOrders = useMemo(() => {
    return orders.map((o) => {
      return (
        <div
          key={o._id}
          className='flex items-center justify-between gap-[20px] text-sm'
        >
          <div className='flex-1 flex items-center gap-[10px]'>
            <LazyLoadImage
              className='w-[40px] h-[40px]'
              src={o.product.image}
              alt={o.product.name}
            />
            <p>{capitalizeFirstLetter(o.product.name)}</p>
          </div>
          <div className='w-1/4 flex items-center gap-[30px]'>
            <p>Size: {o.product.size}</p>
            <p>Color: {o.product.color}</p>
          </div>
          <p className='w-1/12 text-center'>${o.product.finalPrice}</p>
          <p className='w-1/12 text-center'>{o.product.quantity}</p>
          <p className='w-1/6 text-center'>${o.product.totalPrice}</p>
        </div>
      );
    });
  }, []);
  const totalPrice = useMemo(() => {
    return orders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.product.totalPrice;
    }, 0);
  }, [orders]);
  const handlePaymentMethod = useCallback(
    (payment: string) => {
      setPaymentMethod(payment);
      window.localStorage.setItem('cozastore-payment', payment);
    },
    [orders]
  );

  const handlePayment = useCallback(() => {
    if (dataAddress) {
      createPayment({
        token: token,
        totalPrice: totalPrice,
        products: orders,
        message: message.current?.value,
        address: addressUser,
        type: paymentMethod,
      });
    } else {
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: 'You forgot add your address!',
        },
      });
    }
  }, [paymentMethod, dataAddress, addressUser]);
  useEffect(() => {
    isSuccessPayment &&
      setSearchQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        newQuery.delete('state');
        return newQuery;
      });
    if (isSuccessPayment && paymentMethod === 'transfer') {
      window.open(dataPayment.checkoutUrl, '_self');
    }
    if (isSuccessPayment && paymentMethod === 'cash') {
      navigate(
        `/success?paymentMethod=cash&status=${dataPayment.paymentInfo.status}&orderCode=${dataPayment.paymentInfo.orderCode}`
      );
    }
  }, [isSuccessPayment, searchQuery]);
  if (isLoadingPayment) {
    return <LoadingV2 />;
  }
  return (
    <>
      <section className='container bg-white my-[20px] py-8 flex flex-col gap-[20px] text-darkGray'>
        <div className='text-lg flex items-center gap-[20px] font-semiBold text-purple'>
          <FaLocationDot />
          <h2>Delivery address</h2>
        </div>
        {currAddress && (
          <div className='flex items-center gap-[20px]'>
            <p className='font-bold'>
              {currAddress.name} | {currAddress.phone}
            </p>
            <p>{addressUser}</p>
            {currAddress.isDefault && (
              <div className='px-2 text-[12px] border border-purple text-purple'>
                Default
              </div>
            )}
            <button
              className='text-purple text-sm'
              onClick={() => setVisibleModal('visibleAddressModal')}
            >
              Change
            </button>
          </div>
        )}
        {!currAddress && (
          <button
            className='flex items-center gap-[5px] border border-purple w-max px-4'
            onClick={() => setVisibleModal('visibleAddressModal')}
          >
            <span className='text-lg'>+</span>
            <span className='text-sm text-purple'>Add New Address</span>
          </button>
        )}
      </section>
      <section className='container bg-white py-8 rounded-[2px] flex flex-col gap-[20px] text-darkGray'>
        <div className='flex items-center justify-between gap-[20px]'>
          <h3 className='flex-1 text-md font-bold'>Products</h3>
          <h3 className='w-1/6 text-gray font-bold'>Type</h3>
          <h3 className='w-1/12 text-center text-gray font-bold'>Price</h3>
          <h3 className='w-1/12 text-center text-gray font-bold'>Quantity</h3>
          <h3 className='w-1/6 text-center text-gray font-bold'>Into money</h3>
        </div>
        <div className='flex flex-col gap-[20px]'>{renderedOrders}</div>
      </section>
      <section className='container bg-white border-t-2 border-b-2 border-lightGray border-dotted py-8 text-darkGray flex justify-between items-center'>
        <div className='flex-1 flex items-center gap-[20px] text-sm'>
          <label htmlFor='message'>Message:</label>
          <input
            ref={message}
            className='w-4/5 bg-lightGray px-4 py-2'
            type='text'
            placeholder='Note to sellers...'
          />
        </div>
        <p className='w-1/6 text-center'>Total Price ({orders.length}):</p>
        <p className='w-1/6 text-center font-bold'>${totalPrice}</p>
      </section>
      <section className='container my-8 py-8 bg-white text-darkGray rounded-[2px] flex flex-col gap-[40px]'>
        <div className='flex items-center gap-[40px]'>
          <h3 className='text-md font-bold'>Payment methods:</h3>
          <div className='flex items-center gap-[20px]'>
            <button
              className={`border border-lightGray px-4 py-2 ${
                paymentMethod === 'transfer' ? 'bg-purple text-white' : ''
              }`}
              onClick={() => handlePaymentMethod('transfer')}
            >
              Transfer
            </button>
            <button
              className={`border border-lightGray px-4 py-2 ${
                paymentMethod === 'cash' ? 'bg-purple text-white' : ''
              }`}
              onClick={() => handlePaymentMethod('cash')}
            >
              Payment on delivery
            </button>
          </div>
        </div>
        <div className='border-t border-b border-gray border-dotted py-8 text-darkGray text-sm'>
          <div className='flex flex-col items-end gap-[20px]'>
            <p className='w-1/6 flex justify-between items-center'>
              <span>Total cost of goods</span>
              <span>${totalPrice}</span>
            </p>
            <p className='w-1/6 flex justify-between items-center'>
              <span>Transport fee</span>
              <span>-</span>
            </p>
            <p className='w-1/6 flex justify-between items-center'>
              <span>Total payment</span>
              <span className='text-lg text-red font-bold'>${totalPrice}</span>
            </p>
          </div>
        </div>
        <div className='text-sm flex justify-between items-center'>
          <div className='flex items-center gap-[10px]'>
            <p> Clicking "Place Order" means you agree to abide by</p>
            <button className='text-purple'>The CozaStore Terms</button>
          </div>
          <button
            className='py-2 px-8 text-md bg-purple hover:bg-darkGray text-white rounded-[2px]'
            onClick={handlePayment}
          >
            Place Order
          </button>
        </div>
      </section>
    </>
  );
};

export default CheckoutList;
