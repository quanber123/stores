import { validateImage } from '@/services/utils/validate';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FaRegUser, FaCameraRetro } from 'react-icons/fa6';
import EditButtonUser from './EditButtonUser';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useAuth } from '@/hooks/useAuth';

const SettingsUser = () => {
  const { setVisibleModal } = useContext(ModalContext);
  const user = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fields, setFields] = useState({
    id: user?.id,
    name: user?.name,
  });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const handleClickImage = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleChangeProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [user, fields]
  );
  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateImage(file)) {
        setSelectedFile(file);
        const render = new FileReader();
        render.onload = () => {
          const result = render.result as string;
          setPreviewImg(result);
        };
        render.readAsDataURL(file);
      }
      if (file && !validateImage(file)) {
        setVisibleModal({
          visibleAlertModal: {
            status: 'failed',
            message:
              'Failed: Types of photos are accepted: JPG, PNG, GIF or Webp.',
          },
        });
      }
    },
    [selectedFile, previewImg]
  );
  return (
    <section className='container flex flex-col gap-[40px]'>
      <div className='text-[20px] font-bold pb-4 border-b-2 border-lightGray flex items-center gap-[20px]'>
        <FaRegUser />
        <h2>Personal information</h2>
      </div>
      <div className='flex flex-col tablet:flex-row justify-between items-center gap-[20px]'>
        <div className='w-full tablet:w-1/2 flex flex-col gap-[20px] text-gray font-bold border-b border-lightGray'>
          <label htmlFor='name' className='text-darkGray'>
            Your full name
          </label>
          <input
            id='name'
            name='name'
            className='text-sm'
            type='text'
            placeholder='Add your full name...'
            onChange={handleChangeProfile}
          />
        </div>
        <EditButtonUser id={fields.id} name='name' value={fields.name} />
      </div>
      <div className='flex flex-wrap gap-[20px] tablet:gap-[40px]'>
        <div>
          <label htmlFor='image' className='text-darkGray font-bold'>
            Avatar
          </label>
          <p className='text-sm'>
            Only the following types of photos are accepted: JPG, PNG, GIF or
            Webp.
          </p>
        </div>
        <div className='relative mx-auto w-[80px] h-[80px] flex justify-center items-center rounded-full border border-lightGray overflow-hidden'>
          <input
            ref={fileRef}
            id='image'
            name='image'
            className='hidden'
            type='file'
            onChange={handleChangeFile}
          />
          {user?.image && user?.name ? (
            <img
              className='w-full h-full cursor-pointer'
              src={previewImg || user?.image}
              alt={user?.name}
            />
          ) : (
            <></>
          )}
          <div
            className='absolute top-0 left-0 w-full h-full bg-overlayBlack flex justify-center items-center cursor-pointer z-20 opacity-0 hover:opacity-100'
            style={{ transition: 'opacity 0.3s linear' }}
          >
            <FaCameraRetro
              className='text-lg text-white'
              onClick={handleClickImage}
            />
          </div>
        </div>
        <EditButtonUser id={user?.id} name='image' value={selectedFile} />
      </div>
    </section>
  );
};

export default SettingsUser;
