import LazyLoadImage from '@/services/utils/lazyload-image';
import orderImg from '@/assets/images/order.png';
const NotFoundPurchase = () => {
  return (
    <section className='container bg-white py-16 flex-1 flex flex-col justify-center items-center gap-[20px]'>
      <LazyLoadImage
        className='w-[180px] h-[180px]'
        src={orderImg}
        alt='order-img'
      />
      <h3 className='text-lg text-center text-darkGray font-medium'>
        No orders yet.
      </h3>
    </section>
  );
};

export default NotFoundPurchase;
