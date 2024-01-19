import Modal from '@/Modal';
import { useContext } from 'react';
import { ModalContext } from '../../hooks/modalContext';
import { FaRegCircleDot } from 'react-icons/fa6';
const AddressModal = () => {
  const { state, setVisibleModal } = useContext(ModalContext);
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
              <div className='flex items-start gap-[10px]'>
                <FaRegCircleDot className='mt-2 text-purple' />
                <div className='flex flex-col gap-[10px]'>
                  <p>
                    Trần Mạnh Quân |{' '}
                    <span className='text-sm text-gray'>(+84) 334115449</span>
                  </p>
                  <div className='text-sm text-gray'>
                    <p>129/60 Đường Bát Khối</p>
                    <p>Phường Long Biên, Quận Long Biên, Hà Nội</p>
                  </div>
                  <div className='w-max px-2 border border-purple'>
                    <p className='text-sm text-purple'>Default</p>
                  </div>
                </div>
                <button className='ml-auto text-purple'>Edit</button>
              </div>
              <div className='flex items-start gap-[10px]'>
                <FaRegCircleDot className='mt-2 text-purple' />
                <div className='flex flex-col gap-[10px]'>
                  <p>
                    Trần Mạnh Quân |{' '}
                    <span className='text-sm text-gray'>(+84) 334115449</span>
                  </p>
                  <div className='text-sm text-gray'>
                    <p>129/60 Đường Bát Khối</p>
                    <p>Phường Long Biên, Quận Long Biên, Hà Nội</p>
                  </div>
                  <div className='w-max px-2 border border-purple'>
                    <p className='text-sm text-purple'>Default</p>
                  </div>
                </div>
                <button className='ml-auto text-purple'>Edit</button>
              </div>
              <div className='flex items-start gap-[10px]'>
                <FaRegCircleDot className='mt-2 text-purple' />
                <div className='flex flex-col gap-[10px]'>
                  <p>
                    Trần Mạnh Quân |{' '}
                    <span className='text-sm text-gray'>(+84) 334115449</span>
                  </p>
                  <div className='text-sm text-gray'>
                    <p>129/60 Đường Bát Khối</p>
                    <p>Phường Long Biên, Quận Long Biên, Hà Nội</p>
                  </div>
                  <div className='w-max px-2 border border-purple'>
                    <p className='text-sm text-purple'>Default</p>
                  </div>
                </div>
                <button className='ml-auto text-purple'>Edit</button>
              </div>
            </div>
            <button className='flex items-center gap-[5px] border border-purple w-max px-4'>
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
