import LoadingV2 from '@/components/common/Loading/LoadingV2';
import NotFoundPurchase from '@/components/pages/auth/purchase/NotFoundPurchase';
import OrdersFilter from '@/components/pages/auth/purchase/OrdersFilter';
import OrdersList from '@/components/pages/auth/purchase/OrdersList';
import { useGetAllOrdersQuery } from '@/services/redux/features/productFeatures';
import { accessToken } from '@/services/redux/slice/authSlice';
import SetHeader from '@/services/utils/set-header';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

function PurchaseViews() {
  const location = useLocation();
  const token = useSelector(accessToken);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const page = Number(searchQuery.get('page')) || 1;
  const { data: dataOrders, isFetching: isFetchingOrders } =
    useGetAllOrdersQuery({ token, query: searchQuery.toString() });
  useLayoutEffect(() => {
    setSearchQuery((prevQuery) => {
      const newQuery = new URLSearchParams(prevQuery);
      newQuery.set('page', page?.toString() as string);
      return newQuery.toString();
    });
  }, []);
  return (
    <>
      <SetHeader title={location.pathname} isBlockIndex={false} />
      <main className='bg-lightGray gap-[20px]'>
        <OrdersFilter />
        {isFetchingOrders && <LoadingV2 />}
        {!dataOrders?.orders?.length && !isFetchingOrders && (
          <NotFoundPurchase />
        )}
        {dataOrders?.orders?.length && !isFetchingOrders && (
          <OrdersList
            orders={dataOrders.orders}
            totalPage={dataOrders.totalPage}
          />
        )}
      </main>
    </>
  );
}

export default PurchaseViews;
