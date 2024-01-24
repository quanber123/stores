import {
  useGetAllFavoritesQuery,
  usePostFavoritesMutation,
} from '@/services/redux/features/productFeatures';
import {
  accessToken,
  getAllFavorites,
  setAllFavorites,
} from '@/services/redux/slice/authSlice';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DropdownContext } from '../../hooks/dropdownContext';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { capitalizeFirstLetter } from '@/services/utils/format';
import './FavoriteDropdown.css';
// import { useState } from 'react';
// import { getFavorite, removeFormFavorite } from '@/store/slice/favoriteSlice';
function FavoriteDropdown() {
  const token = useSelector(accessToken);
  const dispatch = useDispatch();
  const [searchQuery] = useSearchParams();
  const getToken = searchQuery.get('token') ?? '';
  const navigate = useNavigate();
  const { state, setVisibleDropdown, closeDropdown } =
    useContext(DropdownContext);
  const favorites = useSelector(getAllFavorites);
  const { data: favoriteData, isSuccess: isSuccessFavorite } =
    useGetAllFavoritesQuery(token ?? getToken, {
      skip: token || getToken ? false : true,
    });
  const [postFavorite] = usePostFavoritesMutation();
  useEffect(() => {
    if (isSuccessFavorite && favoriteData) {
      dispatch(setAllFavorites(favoriteData));
    }
  }, [isSuccessFavorite, favoriteData]);
  const handleRedirect = useCallback(
    (id: string) => {
      navigate(`/shop/${id}`);
      closeDropdown();
    },
    [navigate]
  );
  const renderedFavorite = useMemo(() => {
    return favorites.favorite?.products?.map((p) => {
      return (
        <article
          key={p._id}
          className='text-semiBoldGray flex justify-between gap-[20px]'
        >
          <div className='relative rounded-[12px] overflow-hidden'>
            <LazyLoadImage
              src={p.images[0]}
              alt={p.name}
              className='w-[150px] h-[80px]'
            />
          </div>
          <div className='flex-1 flex flex-col justify-between gap-[5px]'>
            <h3
              className='font-bold cursor-pointer'
              onClick={() => handleRedirect(p._id)}
            >
              {capitalizeFirstLetter(p.name)}
            </h3>
            <button
              className='w-max ml-auto px-4 py-2 text-base rounded-[2px] text-white bg-purple hover:bg-darkGray'
              onClick={() => postFavorite({ token: token, productId: p._id })}
            >
              Unlike
            </button>
          </div>
        </article>
      );
    });
  }, [favorites.favorite]);
  return (
    <>
      <div className='relative text-semiBoldGray hover:text-purple transition-colors cursor-pointer'>
        <div className='flex items-center gap-[20px]'>
          <FaHeart
            className='text-lg hover:text-purple transition-colors cursor-pointer'
            onClick={() => setVisibleDropdown('visibleFavoriteDropdown')}
          />
          <p className='block tablet:hidden font-bold'>Your Favorite</p>
          {favorites.favorite?.products?.length ? (
            <span className='hidden tablet:flex absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] justify-center items-center z-10 bg-purple text-white'>
              {favorites.favorite.products.length}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`favorite-modal ${
            state.visibleFavoriteDropdown ? 'active' : ''
          }`}
        >
          <h3 className='pl-[16px] text-md text-semiBoldGray font-bold'>
            Your Favorite
          </h3>
          <div className='flex-1 pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-auto'>
            {favorites.favorite?.products?.length ? (
              renderedFavorite
            ) : (
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[10px]'>
                {/* <LazyLoadImage
                  className='w-[100px] h-[100px] rounded-[2px]'
                  src={cartImg}
                  alt='cart-img'
                /> */}
                <p className='font-bold'>No products yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteDropdown;
