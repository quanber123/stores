import {
  getVisibleFavoriteModal,
  setVisibleAlertModal,
  setVisibleFavoriteModal,
} from '@/store/slice/modalSlice';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getFavorite, removeFormFavorite } from '@/store/slice/favoriteSlice';
function FavoriteModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const visibleModal = useSelector(getVisibleFavoriteModal);
  const [removeItem, setRemoveItem] = useState<string | null>(null);
  const handleCheckFavorite = () => {
    if (window.innerWidth > 640) {
      dispatch(setVisibleFavoriteModal());
    } else {
      navigate('/Favorite');
    }
  };
  // const redirectFavorite = () => {
  //   dispatch(setVisibleFavoriteModal());
  //   navigate('/favorite');
  // };
  // const handleRemoveFavorite = (_id: string, price: number) => {
  //   dispatch(
  //     removeFormFavorite({
  //       _id: _id,
  //       price: price,
  //     })
  //   );
  //   dispatch(
  //     setVisibleAlertModal({
  //       status: 'success',
  //       message: 'Success: Deleted Product!',
  //       color: 'green',
  //       backgroundColor: 'lightGreen',
  //     })
  //   );
  // };
  // const renderedFavorite = favorite?.map((f) => {
  //   return (
  //     <article
  //       key={f._id}
  //       className='text-semiBoldGray flex items-center gap-[20px]'
  //     >
  //       <div
  //         className='relative rounded-[12px] overflow-hidden'
  //         onMouseEnter={() => setRemoveItem(f._id)}
  //         onMouseLeave={() => setRemoveItem(null)}
  //       >
  //         <img className='w-[150px] h-[80px]' src={f.image} alt='' />
  //         <div
  //           className={`${
  //             f._id === removeItem ? 'w-full h-full' : 'w-0 h-0'
  //           } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg bg-overlayPurple flex justify-center items-center`}
  //           style={{ transition: 'all 0.3s ease' }}
  //         >
  //           <FaHeart
  //             className='cursor-pointer'
  //             onClick={() => handleRemoveFavorite(f._id, f.price)}
  //           />
  //         </div>
  //       </div>
  //       <div className='flex flex-col gap-[5px]'>
  //         <h3 className='font-bold'>{f.name}</h3>
  //         <p className='flex items-center gap-[10px]'>
  //           <span>Size: {f.size}</span>
  //           <span>Color: {f.color}</span>
  //         </p>
  //         <p>
  //           Quantity: <span className='font-bold'>{f.quantity}</span>
  //         </p>
  //         <p>
  //           Total Price: <span className='font-bold'>{f.totalPrice}$</span>
  //         </p>
  //       </div>
  //     </article>
  //   );
  // });
  return (
    <>
      <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
        <div className='flex items-center gap-[20px]'>
          <FaHeart
            className='text-lg hover:text-purple transition-colors cursor-pointer'
            onClick={handleCheckFavorite}
          />
          <p className='block tablet:hidden font-bold'>Your Favorite</p>
          {favorite.length ? (
            <span className='hidden tablet:flex absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] justify-center items-center z-10 bg-purple text-white'>
              {favorite.length}
            </span>
          ) : (
            <></>
          )}
        </div>
        {/* <div className={`favorite-modal ${visibleModal ? 'active' : ''}`}>
          <div className='pl-[16px] pr-[32px] flex justify-between items-center'>
            <h3 className='text-md text-semiBoldGray font-bold'>
              Your Favorite
            </h3>
            <button
              className='text-purple font-bold'
              onClick={redirectFavorite}
            >
              See all
            </button>
          </div>
          <div className='pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-y-auto'>
            {favorite.length ? (
              renderedFavorite
            ) : (
              <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-purple font-bold text-xl text-center'>
                No Product In Your Favorite
              </p>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
}

export default FavoriteModal;
