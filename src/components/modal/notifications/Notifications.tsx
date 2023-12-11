import {
  getVisibleNotificationsModal,
  setVisibleNotificationsModal,
} from '@/store/slice/modalSlice';
import { FaBell } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import logoImg from '@/assets/images/logo-04.png-fotor-2023121102555.png';
import './Notifications.css';
function NotificationsModal() {
  const dispatch = useDispatch();
  const visibleModal = useSelector(getVisibleNotificationsModal);
  return (
    <>
      <div className='relative text-semiBoldGray'>
        <div>
          <FaBell
            className='text-lg hover:text-purple transition-colors cursor-pointer'
            onClick={() => dispatch(setVisibleNotificationsModal())}
          />
          <span className='absolute -top-1/2 -right-[10px] w-[18px] h-[16px] text-[12px] flex justify-center items-center -z-10 bg-purple text-white'>
            10
          </span>
        </div>
        <div className={`notifications-modal ${visibleModal ? 'active' : ''}`}>
          <div className='pl-[16px] pr-[32px] flex justify-between items-center'>
            <h3 className='text-md font-bold'>Notifications</h3>
            <button className='text-purple font-bold'>Mark as read</button>
          </div>
          <div className='pl-[16px] pr-[32px] flex flex-col gap-[20px] overflow-y-auto'>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div className='bg-purple w-[42px] h-[42px] flex justify-center items-center rounded-full'>
                <img
                  src={logoImg}
                  alt='logo'
                  className='w-[24px] h-[24px] object-contain'
                />
              </div>
              <div>
                <p>The new product has been added.</p>
                <p className='text-purple font-bold'>1 month ago</p>
              </div>
            </div>
          </div>
          <div className='mt-auto w-full h-[44px] border-t border-gray'>
            <button className='w-full h-full text-center text-purple hover:bg-lightGray font-bold'>
              Open Notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationsModal;
