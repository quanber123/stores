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
  const token = window.localStorage.getItem('coza-store-token');
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
    useGetAddressUserQuery(null, { skip: !token });
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
        <tr key={o._id}>
          <td className='p-4'>
            <div className='flex items-center tablet:flex-row flex-col gap-[20px]'>
              <LazyLoadImage
                className='w-[40px] h-[40px]'
                src={o.product.image}
                alt={o.product.name}
              />
              <p>{capitalizeFirstLetter(o.product.name)}</p>
            </div>
          </td>
          <td className='p-4'>
            <div className='flex gap-[20px] items-center'>
              <p>Size: {o.product.size}</p>
              <p>Color: {o.product.color}</p>
            </div>
          </td>
          <td className='p-4 text-center'>{o.product.finalPrice} VND</td>
          <td className='p-4 text-center'>{o.product.quantity}</td>
          <td className='p-4 text-center'>{o.product.totalPrice} VND</td>
        </tr>
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
        totalPrice: totalPrice,
        products: orders,
        user_name: currAddress.name,
        phone: currAddress.phone,
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
          <div className='flex items-center gap-[20px] text-sm laptop:text-base'>
            <div className='flex desktop:flex-row flex-col gap-[12px]'>
              <p className='font-bold'>
                {currAddress.name} | {currAddress.phone}
              </p>
              <p>{addressUser}</p>
              {currAddress.isDefault && (
                <div className='px-2 text-[12px] border border-purple text-purple'>
                  Default
                </div>
              )}
            </div>
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
      <section className='container bg-white py-8 rounded-[2px] text-darkGray'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full whitespace-nowrap'>
            <thead>
              <tr className='font-bold'>
                <td className='p-4 text-center tablet:text-start'>Products</td>
                <td className='p-4 text-center tablet:text-start'>Type</td>
                <td className='p-4 text-center'>Price</td>
                <td className='p-4 text-center'>Quantity</td>
                <td className='p-4 text-center'>Into money</td>
              </tr>
            </thead>
            <tbody>{renderedOrders}</tbody>
          </table>
        </div>
      </section>
      <section className='container bg-white border-t-2 border-b-2 border-lightGray border-dotted py-8 text-darkGray flex tablet:flex-row flex-col tablet:justify-between items-start tablet:items-center gap-[20px]'>
        <div className='tablet:w-1/2 flex-1 flex items-center gap-[20px] text-sm'>
          <label htmlFor='message'>Message:</label>
          <input
            ref={message}
            className='w-4/5 bg-lightGray px-4 py-2'
            type='text'
            placeholder='Note to sellers...'
          />
        </div>
        <div className='tablet:w-1/2 flex justify-center items-center gap-[40px]'>
          <p className='text-center'>Total Price ({orders.length}):</p>
          <p className='text-center font-bold'>${totalPrice}</p>
        </div>
      </section>
      <section className='container my-8 py-8 bg-white text-darkGray rounded-[2px] flex flex-col gap-[40px]'>
        <div className='flex flex-col tablet:flex-row tablet:items-center tablet:gap-[40px] gap-[20px]'>
          <h3 className='text-md font-bold'>Payment methods:</h3>
          <div className='flex flex-col tablet:flex-row tablet:items-center gap-[20px]'>
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
          <div className='flex flex-col desktop:items-end gap-[20px]'>
            <p className='desktop:w-1/6 flex justify-between items-center'>
              <span>Total cost of goods</span>
              <span>{totalPrice} VND</span>
            </p>
            <p className='desktop:w-1/6 flex justify-between items-center'>
              <span>Transport fee</span>
              <span>-</span>
            </p>
            <p className='desktop:w-1/6 flex justify-between items-center'>
              <span>Total payment</span>
              <span className='text-lg text-red font-bold'>
                {totalPrice} VND
              </span>
            </p>
          </div>
        </div>
        <div className='text-sm flex flex-col laptop:flex-row justify-between laptop:items-center gap-[40px] tablet:gap-[20px] laptop:gap-0'>
          <div className='flex flex-col tablet:flex-row tablet:items-center tablet:gap-[10px]'>
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
