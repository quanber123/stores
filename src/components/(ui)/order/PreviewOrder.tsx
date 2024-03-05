import { ModalContext } from '@/components/modal/hooks/modalContext';
import { Order } from '@/interfaces/interfaces';
import { useUpdateOrderMutation } from '@/services/redux/features/productFeatures';
import LazyLoadImage from '@/services/utils/lazyload-image';
import scrollElement from '@/services/utils/scroll-elements';
import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {
  order: Order;
};
const OrderPreview: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('coza-store-token');
  const { setVisibleModal } = useContext(ModalContext);
  const [updateOrder] = useUpdateOrderMutation();
  const handleRedirect = useCallback(
    (id: string, type: string) => {
      scrollElement();
      navigate(`/${type}/${id}`);
    },
    [navigate]
  );
  const handleUpdateCart = useCallback(
    (
      token: string | null,
      orderId: string | number,
      status: string,
      message: string
    ) => {
      setVisibleModal({
        visibleConfirmModal: {
          message: message,
          function: () =>
            updateOrder({
              token: token,
              orderId: orderId,
              status: status,
            }),
        },
      });
    },
    []
  );
  const renderedProducts = useMemo(
    () =>
      order?.paymentInfo.products.map((p) => {
        return (
          <div
            key={p._id}
            className={`${
              order.paymentInfo.status === 'delivered' ||
              order.paymentInfo.status === 'cancel'
                ? 'my-4'
                : ''
            }`}
          >
            <div className='container relative bg-white border-lightGray border-b py-4 flex items-center gap-[20px]'>
              <p className='absolute right-[1%] top-[10%] text-md text-red font-semiBold uppercase'>
                {order.paymentInfo.status}
              </p>
              <LazyLoadImage
                className='w-[80px] h-[80px]'
                src={p.image}
                alt={p.name}
              />
              <div>
                <p className='font-semiBold'>{p.name}</p>
                <div className='text-gray flex items-center gap-[20px]'>
                  <p>Size: {p.size}</p>
                  <p>Color: {p.color}</p>
                </div>
                <p>x{p.quantity}</p>
              </div>
              <div className='ml-auto flex items-center gap-[10px]'>
                <p
                  className={`${
                    p.salePrice > 0 ? 'line-through text-gray' : ''
                  }`}
                >
                  {p.price}đ
                </p>
                {p.salePrice > 0 && <p className='text-red'>{p.salePrice}đ</p>}
              </div>
            </div>
            <div className='container relative bg-white py-4 flex flex-col items-end gap-[20px]'>
              <p className='absolute bottom-4 left-4 text-gray text-sm'>
                Payment Methods:{' '}
                <span className='capitalize font-bold'>
                  {order.paymentMethod}
                </span>
              </p>
              <div className='flex items-center gap-[20px]'>
                <p>Into money:</p>
                <p className='text-md text-red font-bold'>{p.totalPrice}đ</p>
              </div>
              <div className='flex items-center gap-[20px]'>
                {(order.paymentInfo.status === 'delivered' ||
                  order.paymentInfo.status === 'cancel') && (
                  <>
                    <button
                      className='w-[150px] py-2 bg-purple hover:bg-darkGray text-white rounded-[4px]'
                      onClick={() => handleRedirect(p.id, 'shop')}
                    >
                      Repurchase
                    </button>
                    {order.paymentInfo.status === 'delivered' && p.isReview && (
                      <button
                        className='w-[150px] py-2 border border-darkGray  bg-darkGray text-white rounded-[4px]'
                        onClick={() => handleRedirect(p.id, 'shop')}
                      >
                        See reviews
                      </button>
                    )}
                    {order.paymentInfo.status === 'delivered' &&
                      !p.isReview && (
                        <button
                          className='w-[150px] py-2 border border-darkGray bg-white hover:bg-darkGray text-darkGray hover:text-white rounded-[4px]'
                          onClick={() =>
                            setVisibleModal({
                              visibleReviewsModal: { ...p, orderId: order._id },
                            })
                          }
                        >
                          Reviews
                        </button>
                      )}
                  </>
                )}
                {order.paymentInfo.status === 'processing' && (
                  <button
                    className='w-[150px] py-2 bg-purple hover:bg-darkGray text-white rounded-[4px]'
                    onClick={() =>
                      handleUpdateCart(
                        token,
                        order.paymentInfo.orderCode,
                        'delivered',
                        'Are you sure you have received the goods?'
                      )
                    }
                  >
                    Goods received
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }),
    [order]
  );
  return (
    <div className='flex flex-col'>
      {renderedProducts}
      {order.paymentInfo.status.toUpperCase() === 'PENDING' && (
        <div className='container bg-white py-4 flex flex-col items-end gap-[20px]'>
          <p className='text-md'>
            Total money:{' '}
            <span className='text-red font-bold'>
              {order.paymentInfo.amount}đ
            </span>
          </p>
          <div className='flex justify-end items-center gap-[20px]'>
            {order.paymentMethod === 'transfer' && (
              <button
                className='w-[150px] py-2 bg-purple hover:bg-darkGray text-white rounded-[4px]'
                onClick={() =>
                  window.open(order.paymentInfo?.checkoutUrl, '_self')
                }
              >
                Pay immediately
              </button>
            )}
            <button
              className='w-[150px] hover:bg-darkGray hover:text-white py-2 border border-darkGray rounded-[4px]'
              onClick={() =>
                handleUpdateCart(
                  token,
                  order.paymentInfo.orderCode,
                  'CANCELLED',
                  'Do you want to cancel this order?'
                )
              }
            >
              Cancel order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPreview;
