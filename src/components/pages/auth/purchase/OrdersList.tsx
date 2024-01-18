import OrderPreview from '@/components/ui/order/PreviewOrder';
import Pagination from '@/components/ui/pagination/Pagination';
import { Order } from '@/interfaces/interfaces';
import React, { useMemo } from 'react';
type Props = {
  orders: Order[];
  totalPage: number;
};
const OrdersList: React.FC<Props> = ({ orders, totalPage }) => {
  const renderedOrders = useMemo(
    () => orders.map((o) => <OrderPreview key={o._id} order={o} />),
    [orders]
  );
  return (
    <section className='flex-1 flex flex-col items-center gap-[20px] text-darkGray'>
      <div className='w-full flex flex-col'>{renderedOrders}</div>
      <Pagination totalPage={totalPage as number} />
    </section>
  );
};

export default OrdersList;
