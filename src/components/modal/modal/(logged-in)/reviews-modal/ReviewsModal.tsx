import Modal from '@/Modal';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ModalContext } from '../../../hooks/modalContext';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { accessToken, authInfo } from '@/services/redux/slice/authSlice';
import { hidePartialUsername } from '@/services/utils/format';
import useClickOutside from '@/hooks/useClickOutside';
import { useReviewsProductMutation } from '@/services/redux/features/productFeatures';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { validateEmptyStr } from '@/services/utils/validate';

const ReviewsModal = () => {
  const user = useSelector(authInfo);
  const { state, setVisibleModal } = useContext(ModalContext);
  const token = useSelector(accessToken);
  const [
    reviewsProduct,
    {
      data: dataReviews,
      isSuccess: isSuccessReviews,
      isLoading: isLoadingReviews,
    },
  ] = useReviewsProductMutation();
  const [modalRef, clickOutside] = useClickOutside('visibleReviewsModal');
  const [rate, setRate] = useState(5);
  const [reviewsForm, setReviewsForm] = useState({
    reviews: '',
    showUser: false,
  });
  const [err, setErr] = useState(false);
  const product = useMemo(
    () => state.visibleReviewsModal,
    [state.visibleReviewsModal]
  );
  const handleStarClick = (selectedRate: number) => {
    setRate(selectedRate);
  };
  const handleChangeReviews = (e: React.ChangeEvent<any>) => {
    const { name, type, value, checked } = e.target;
    setReviewsForm((prevForm) => {
      return { ...prevForm, [name]: type === 'checkbox' ? checked : value };
    });
  };

  const getRatingText = () => {
    switch (rate) {
      case 1:
        return 'Poor';
      case 2:
        return 'Not Satisfied';
      case 3:
        return 'Average';
      case 4:
        return 'Satisfied';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };
  const renderedStars = useMemo(() => {
    return [...Array(5)].map((_, index) => {
      return (
        <div
          key={index}
          className='cursor-pointer'
          onClick={() => handleStarClick(index + 1)}
        >
          {rate >= index + 1 ? (
            <FaStar className='text-yellow' />
          ) : (
            <FaRegStar />
          )}
        </div>
      );
    });
  }, [rate]);
  const handleReviews = () => {
    if (!validateEmptyStr(reviewsForm.reviews)) {
      reviewsProduct({
        token: token,
        reviews: {
          ...reviewsForm,
          rate: rate,
          productId: product.id,
          orderId: product.orderId,
        },
      });
    } else {
      setErr(true);
    }
  };
  useEffect(() => {
    if (isSuccessReviews && dataReviews) {
      setErr(false);
      setVisibleModal('visibleReviewsModal');
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: dataReviews?.message,
        },
      });
    }
  }, [isSuccessReviews, dataReviews]);
  if (isLoadingReviews) {
    return <LoadingV2 />;
  }
  return (
    <Modal>
      <section
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-overlayBlack flex justify-center items-center text-darkGray ${
          state.visibleReviewsModal ? 'w-full h-full z-[999]' : 'w-0 h-0 -z-10'
        }`}
        onClick={clickOutside}
      >
        <div
          className='bg-white w-4/5 laptop:w-1/3 py-6 flex flex-col justify-between gap-[20px] rounded text-darkGray'
          ref={modalRef}
        >
          <div className='px-6 flex flex-col gap-[20px]'>
            <p>Product reviews</p>
            <div className='flex gap-[10px]'>
              <LazyLoadImage
                src={product.image}
                alt={product.name}
                className='w-[56px] h-[56px]'
              />
              <div className='text-sm flex flex-col gap-[4px]'>
                <p className='capitalize'>{product.name}</p>
                <div className='flex items-center gap-[10px] text-gray'>
                  <p>Color: {product.color}</p>
                  <p>Size: {product.size}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <p>Product quality:</p>
              <div className='flex text-lg'>{renderedStars}</div>
              <p className='text-yellow'>{getRatingText()}</p>
            </div>
            <textarea
              className={`border ${
                validateEmptyStr(reviewsForm.reviews) && err
                  ? 'border-red'
                  : 'border-gray'
              } focus:outline-none rounded-[4px] p-4`}
              name='reviews'
              id='reviews'
              placeholder='Please share what you like about this product with others.'
              cols={10}
              rows={10}
              value={reviewsForm.reviews}
              onChange={handleChangeReviews}
            />
            <div className='flex items-center gap-[10px]'>
              <input
                className='w-[20px] h-[20px]'
                type='checkbox'
                id='showUser'
                name='showUser'
                checked={reviewsForm.showUser}
                onChange={handleChangeReviews}
              />
              <label htmlFor='showUser' className='flex flex-col text-sm'>
                <p>Username displayed on this review</p>
                <p className='text-[12px] text-gray'>
                  The account will be displayed as{' '}
                  {reviewsForm.showUser
                    ? user.email
                    : hidePartialUsername(user.email)}
                </p>
              </label>
            </div>
            <div className='flex justify-end items-center gap-[20px]'>
              <button onClick={() => setVisibleModal('visibleReviewsModal')}>
                Return
              </button>
              <button
                className='bg-purple hover:bg-darkGray px-2 py-1 text-white rounded-[2px]'
                onClick={handleReviews}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ReviewsModal;
