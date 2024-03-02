import useQueryString from '@/hooks/useQueryString';
import { StatusOrder } from '@/interfaces/interfaces';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const OrdersFilter = () => {
  const [statusOrder, setStatusOrder] = useState<StatusOrder[]>([]);
  const endpoints = import.meta.env.VITE_BACKEND_URL;
  const [queryString, handleChangeQuery] = useQueryString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${endpoints}status-order`);
        setStatusOrder(res.data);
      } catch (error) {
        console.log('get data orders was wrong!');
      }
    };
    statusOrder.length === 0 && fetchData();
  }, []);
  const renderedFilters = useMemo(
    () =>
      statusOrder.map((s) => {
        return (
          <div
            className='relative flex-1 flex justify-center items-center'
            key={s._id}
          >
            <button
              className={`w-full h-full py-4 uppercase ${
                queryString['status'] === s.name ? 'text-purple' : ''
              } `}
              onClick={() => handleChangeQuery('status', s.name)}
              data-name='status'
            >
              {s.name}
            </button>
            <div
              style={{ transition: 'all 0.3s ease' }}
              className={`absolute left-1/2 -translate-x-1/2 bottom-0 ${
                queryString['status'] === s.name ? 'w-full' : 'w-0'
              } h-[2px] bg-purple`}
            ></div>
          </div>
        );
      }),
    [statusOrder, queryString]
  );
  return (
    <section className='container my-4 bg-white flex justify-between items-center text-darkGray font-medium'>
      <div className='relative flex-1 flex justify-center items-center'>
        <button
          className={`w-full h-full  py-4  ${
            !queryString['status'] ? 'text-purple' : ''
          }`}
          data-name='status'
          value={'default'}
          onClick={() => handleChangeQuery('status', 'default')}
        >
          All
        </button>
        <div
          style={{ transition: 'all 0.3s ease' }}
          className={`absolute left-1/2 -translate-x-1/2 bottom-0 
           ${!queryString['status'] ? 'w-full' : 'w-0'} h-[2px] bg-purple`}
        ></div>
      </div>
      {renderedFilters}
    </section>
  );
};

export default OrdersFilter;
