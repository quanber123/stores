import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from '@/services/redux/features/userFeatures';
import { setVisibleAlertModal } from '@/services/redux/slice/modalSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
type Props = {
  id: string | null;
  name: string | null;
  value?: string | File | null;
};
const EditButtonUser: React.FC<Props> = ({ id, name, value }) => {
  const dispatch = useDispatch();
  const [editBtn, setEditBtn] = useState(false);
  const [
    updateProfile,
    {
      data: messageProfile,
      isSuccess: isSuccessProfile,
      isLoading: isLoadingProfile,
    },
  ] = useUpdateProfileMutation();
  const [
    updatedAvatar,
    {
      data: messageAvatar,
      isSuccess: isSuccessAvatar,
      isLoading: isLoadingAvatar,
    },
  ] = useUpdateAvatarMutation();
  const handleEdit = useCallback(() => {
    setEditBtn((prevState) => (prevState = !prevState));
  }, [editBtn]);
  const handleSaveUser = useCallback(() => {
    if (name === 'image' && id && value) {
      const imageData = new FormData();
      imageData.append('id', id);
      imageData.append('image', value);
      updatedAvatar(imageData);
    }
    if (name !== 'image') {
      updateProfile({ id, name, value });
    }
  }, [id, name, value]);
  useEffect(() => {
    if (isSuccessProfile && !isLoadingProfile) {
      dispatch(
        setVisibleAlertModal({
          status: 'success',
          message: `Success: ${messageProfile?.message}`,
        })
      );
      setEditBtn(false);
    }
  }, [
    dispatch,
    updateProfile,
    messageProfile,
    isSuccessProfile,
    isLoadingProfile,
  ]);
  useEffect(() => {
    if (isSuccessAvatar && !isLoadingAvatar) {
      dispatch(
        setVisibleAlertModal({
          status: 'success',
          message: `Success: ${messageAvatar?.message}`,
        })
      );
    }
  }, [
    dispatch,
    updatedAvatar,
    messageAvatar,
    isSuccessAvatar,
    isLoadingAvatar,
  ]);
  return (
    <div className='w-[260px] mx-auto tablet:mx-0 flex items-center gap-[20px]'>
      <button
        className={`w-[120px] h-[40px] mx-auto tablet:ml-auto tablet:mr-0 p-2 border border-gray hover:border-purple rounded-[24px] text-sm text-gray hover:text-purple font-bold ${
          editBtn ? 'hidden' : 'block'
        }`}
        onClick={handleEdit}
      >
        Edit
      </button>
      {editBtn ? (
        <>
          <button
            className='w-[120px] h-[40px] p-2 border border-gray hover:border-purple rounded-[24px] text-sm text-white font-bold bg-darkGray hover:bg-purple'
            onClick={handleSaveUser}
          >
            Save
          </button>
          <button
            className='w-[120px] h-[40px] p-2 border border-gray hover:border-purple rounded-[24px] text-sm text-gray hover:text-purple font-bold'
            onClick={handleEdit}
          >
            Cancel
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditButtonUser;
