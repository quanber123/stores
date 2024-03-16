import { useGetAllStoresQuery } from '@/services/redux/features/productFeatures';
import LazyLoadImage from '@/services/utils/lazyload-image';
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import bgImg from '@/assets/images/bg-01.jpg.webp';
import { FaRegEnvelope, FaMapLocationDot, FaPhone } from 'react-icons/fa6';
import gsap from 'gsap';
import { useSendContactMutation } from '@/services/redux/features/userFeatures';
import { ModalContext } from '@/components/modal/hooks/modalContext';
const ContactViews = () => {
  const layoutRef = useRef(null);
  const { setVisibleModal } = useContext(ModalContext);
  const { data: storeData, isSuccess: isSuccessStore } =
    useGetAllStoresQuery(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [
    sendContact,
    {
      data: dataContact,
      isSuccess: isSuccessContact,
      isLoading: isLoadingContact,
    },
  ] = useSendContactMutation();
  const renderedAddress = useMemo(() => {
    return storeData?.map((s: any) => {
      return (
        <li key={s._id}>
          {s.name}: {s.location}
        </li>
      );
    });
  }, [isSuccessStore, storeData]);
  const renderedPhone = useMemo(() => {
    return storeData?.map((s: any) => {
      return (
        <li className='text-purple' key={s._id}>
          +{s.phone}
        </li>
      );
    });
  }, [isSuccessStore, storeData]);
  const renderedEmail = useMemo(() => {
    return storeData?.map((s: any) => {
      return (
        <li className='text-purple' key={s._id}>
          {s.email}
        </li>
      );
    });
  }, [isSuccessStore, storeData]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layoutRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      );
    });
    return () => {
      ctx.revert();
    };
  }, []);
  useEffect(() => {
    if (isSuccessContact) {
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: dataContact.message,
        },
      });
    }
  }, [isSuccessContact]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (emailRef.current?.value && messageRef.current?.value) {
      sendContact({
        email: emailRef.current?.value,
        message: messageRef.current?.value,
      });
    }
  };
  return (
    <main
      ref={layoutRef}
      className='gap-[40px] text-sm tablet:text-base text-darkGray'
    >
      <section className={`relative h-[240px] overflow-hidden`}>
        <div className='w-full h-full'>
          <LazyLoadImage src={bgImg} alt='' className='w-full h-full' />
        </div>
        <h2
          className='absolute top-1/2 left-1/2 z-20 text-white text-2xl tablet:text-3xl font-bold'
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          Contact
        </h2>
      </section>
      <section className='container flex flex-col desktop:flex-row items-stretch'>
        <div className='desktop:w-1/2 order-2 desktop:order-1 p-8 flex flex-col items-center gap-[20px] border border-lightGray'>
          <p className='text-md tablet:text-lg font-medium'>
            Send Us A Message
          </p>
          <form
            className='w-full text-sm flex flex-col gap-[20px]'
            onSubmit={handleSubmit}
          >
            <div className='relative w-full'>
              <input
                ref={emailRef}
                name='email'
                className='w-full border border-lightGray px-12 py-4 rounded-[4px]'
                type='email'
                placeholder='Your Email Address'
                required
              />
              <FaRegEnvelope className='absolute left-4 top-1/2 -translate-y-1/2 text-md text-gray' />
            </div>
            <textarea
              ref={messageRef}
              className='w-full p-4 border border-lightGray rounded-[4px] focus:outline-none'
              name='message'
              cols={30}
              rows={10}
              placeholder='How Can We Help?'
              required
            />
            <button
              className='w-full bg-darkGray hover:bg-purple text-white py-4 rounded-[24px]'
              type='submit'
              disabled={isLoadingContact}
            >
              Submit
            </button>
          </form>
        </div>
        <div className='desktop:w-1/2 order-1 desktop:order-2 py-8 px-8 laptop:px-32 flex flex-col gap-[20px] border border-lightGray overflow-y-auto'>
          <div className='flex flex-col gap-[20px] text-semiBoldGray'>
            <div className='flex items-center gap-[20px]'>
              <FaMapLocationDot className='text-lg laptop:text-xl' />
              <p className='text-md tablet:text-lg'>Address</p>
            </div>
            <ul className='px-12 flex flex-col gap-[14px]'>
              {renderedAddress}
            </ul>
          </div>
          <div className='flex flex-col gap-[20px] text-semiBoldGray'>
            <div className='flex items-center gap-[20px]'>
              <FaPhone className='text-lg laptop:text-xl' />
              <p className='text-md tablet:text-lg'>Lets Talk</p>
            </div>
            <ul className='px-12 flex flex-col gap-[14px]'>{renderedPhone}</ul>
          </div>
          <div className='flex flex-col gap-[20px] text-semiBoldGray'>
            <div className='flex items-center gap-[20px]'>
              <FaRegEnvelope className='text-lg laptop:text-xl' />
              <p className='text-md tablet:text-lg'>Sale Support</p>
            </div>
            <ul className='px-12 flex flex-col gap-[14px]'>{renderedEmail}</ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactViews;
