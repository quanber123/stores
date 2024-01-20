import useQueryString from '@/hooks/useQueryString';
import { useMemo } from 'react';

const OrdersFilter = () => {
  const [queryString, handleChangeQuery] = useQueryString();
  const filters = [
    {
      text: 'Pending',
      value: 'PENDING',
    },
    {
      text: 'Delivering',
      value: 'DELIVERING',
    },
    {
      text: 'Paid',
      value: 'PAID',
    },
    {
      text: 'Cancelled',
      value: 'CANCELLED',
    },
    {
      text: 'Refund',
      value: 'REFUND',
    },
  ];
  const renderedFilters = useMemo(
    () =>
      filters.map((f) => {
        return (
          <div
            className='relative flex-1 flex justify-center items-center'
            key={f.value}
          >
            <button
              className={`w-full h-full py-4 ${
                queryString['status'] === f.value ? 'text-purple' : ''
              } `}
              onClick={() => handleChangeQuery('status', f.value)}
              data-name='status'
            >
              {f.text}
            </button>
            <div
              style={{ transition: 'all 0.3s ease' }}
              className={`absolute left-1/2 -translate-x-1/2 bottom-0 ${
                queryString['status'] === f.value ? 'w-full' : 'w-0'
              } h-[2px] bg-purple`}
            ></div>
          </div>
        );
      }),
    [filters, queryString]
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
