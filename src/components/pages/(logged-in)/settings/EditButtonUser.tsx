import { ModalContext } from '@/components/modal/hooks/modalContext';
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from '@/services/redux/features/userFeatures';
import { accessToken } from '@/services/redux/slice/authSlice';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
type Props = {
  id: string | null;
  name: string | null;
  value?: string | File | null;
};
const EditButtonUser: React.FC<Props> = ({ id, name, value }) => {
  const token = useSelector(accessToken);
  const { setVisibleModal } = useContext(ModalContext);
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
      isError: isErrorAvatar,
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
      updatedAvatar({ token, id: id, file: imageData });
    }
    if (name !== 'image') {
      updateProfile({ token, id, name, value });
    }
  }, [id, name, value]);
  useEffect(() => {
    if (isSuccessProfile && !isLoadingProfile) {
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: `Success: ${messageProfile?.message}`,
        },
      });
      setEditBtn(false);
    }
  }, [updateProfile, messageProfile, isSuccessProfile, isLoadingProfile]);
  useEffect(() => {
    if (isSuccessAvatar && !isLoadingAvatar) {
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: `Success: ${messageAvatar?.message}`,
        },
      });
    }
    if (isErrorAvatar) {
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: `Failed: Failed to upload img!`,
        },
      });
    }
  }, [
    updatedAvatar,
    messageAvatar,
    isSuccessAvatar,
    isLoadingAvatar,
    isErrorAvatar,
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
