import Modal from '@/Modal';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ModalContext } from '../../hooks/modalContext';
import { FaRegCircleDot, FaRegCircle } from 'react-icons/fa6';
import { useGetAddressUserQuery } from '@/services/redux/features/userFeatures';
import { useSelector } from 'react-redux';
import { accessToken } from '@/services/redux/slice/authSlice';
const AddressModal = () => {
  const token = useSelector(accessToken);
  const { state, setVisibleModal } = useContext(ModalContext);
  const { data: dataAddress, isSuccess: isSuccessAddress } =
    useGetAddressUserQuery(token, { skip: !token });
  const [currAddress, setCurrAddress] = useState(null);
  useEffect(() => {
    if (isSuccessAddress && dataAddress) {
      setCurrAddress(dataAddress[0]._id);
    }
  }, [isSuccessAddress, dataAddress]);
  const renderedAddress = useMemo(
    () =>
      isSuccessAddress
        ? dataAddress.map((a: any) => (
            <div
              key={a._id}
              className='flex items-start gap-[10px] cursor-pointer'
              onClick={() => setCurrAddress(a._id)}
            >
              {currAddress === a._id ? (
                <FaRegCircleDot className='mt-2 text-purple' />
              ) : (
                <FaRegCircle className='mt-2 text-gray' />
              )}
              <div className='flex flex-col gap-[10px]'>
                <p>
                  {a.name} |{' '}
                  <span className='text-sm text-gray'>{a.phone}</span>
                </p>
                <div className='text-sm text-gray'>
                  <p>{a.address}</p>
                  <p>
                    {a.district}, {a.city}, {a.state}
                  </p>
                </div>
                {a.isDefault && (
                  <div className='w-max px-2 border border-purple'>
                    <p className='text-sm text-purple'>Default</p>
                  </div>
                )}
              </div>
              <button className='ml-auto text-purple'>Edit</button>
            </div>
          ))
        : null,
    [dataAddress, isSuccessAddress, currAddress]
  );
  return (
    <Modal>
      <section
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-overlayBlack flex justify-center items-center text-darkGray ${
          state.visibleAddressModal ? 'w-full h-full z-[999]' : 'w-0 h-0 -z-10'
        }`}
      >
        <div className='bg-white w-4/5 laptop:w-1/3 py-6 flex flex-col justify-between gap-[20px] rounded'>
          <div className='px-6'>
            <p>My Address</p>
          </div>
          <div className='p-6 flex-1 border-t border-b border-lightGray flex flex-col gap-[40px]'>
            <div className='flex flex-col gap-[20px] max-h-[650px] overflow-y-auto'>
              {renderedAddress}
            </div>
            <button
              className='flex items-center gap-[5px] border border-purple w-max px-4'
              onClick={() => setVisibleModal('visibleAddAddressModal')}
            >
              <span className='text-lg'>+</span>
              <span className='text-sm text-purple'>Add New Address</span>
            </button>
          </div>
          <div className='px-6 flex justify-end gap-[20px]'>
            <button
              className='w-[140px] h-[40px] border border-purple hover:border-darkGray text-purple hover:text-darkGray'
              onClick={() => setVisibleModal('visibleAddressModal')}
            >
              Cancel
            </button>
            <button className='w-[140px] h-[40px] bg-purple hover:bg-darkGray text-white'>
              Confirm
            </button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default AddressModal;
