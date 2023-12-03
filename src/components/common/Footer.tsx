import { useState } from 'react';
import { getAllCategories } from '@/store/slice/categorySlice';
import scrollElement from '@/utils/scroll-elements';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePostEmailMutation } from '@/store/features/emailFeatures';
import { validateEmail } from '@/utils/validate';

function H4({ title }: { title: string }) {
  return <h4 className='text-md text-white font-bold uppercase'>{title}</h4>;
}
function Footer() {
  const categories = useSelector(getAllCategories);
  const helps = ['Track Order', 'Returns', 'Shipping', 'FAQs'];
  const navigate = useNavigate();
  const [postEmail, { isLoading }] = usePostEmailMutation();
  const [focusInput, setFocusInput] = useState(false);
  const [email, setEmail] = useState('');
  const handleLinkClick = (name: string) => {
    navigate(`/shop?category=${name}`);
    scrollElement();
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePostEmail = async () => {
    try {
      if (validateEmail(email)) {
        await postEmail(email);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEmail('');
    }
  };
  const renderedCategories = useMemo(
    () =>
      categories.map((c, index) => {
        return (
          <li key={index}>
            <button
              className='text-sm capitalize'
              onClick={() => handleLinkClick(c.name)}
            >
              {c.name}
            </button>
          </li>
        );
      }),
    [categories]
  );
  const renderHelps = useMemo(
    () =>
      helps.map((h, index) => {
        return (
          <li key={index}>
            <button className='text-sm'>{h}</button>
          </li>
        );
      }),
    []
  );
  return (
    <footer className='py-[75px] bg-semiBoldGray text-lightGray'>
      <div
        className='container grid gap-[40px]'
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
      >
        <div className='flex flex-col gap-[20px]'>
          <H4 title='Categories' />
          <ul className='flex flex-col gap-[10px]'>{renderedCategories}</ul>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <H4 title='Help' />
          <ul className='flex flex-col gap-[10px]'>{renderHelps}</ul>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <H4 title='Get in touch' />
          <p className='text-sm'>
            Any questions? Let us know in store at 8th floor, 379 Hudson St, New
            York, NY 10018 or call us on (+1) 96 716 6879
          </p>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <H4 title='Newsletter' />
          <div className='flex flex-col gap-[20px] text-lightGray text-sm'>
            <div className='wrap-input'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='email@example.com'
                onFocus={() => setFocusInput(true)}
                onBlur={() => setFocusInput(false)}
                onChange={handleChangeEmail}
              />
              <div
                className={`focus-input ${focusInput ? 'active' : ''}`}
              ></div>
            </div>
            {email ? (
              validateEmail(email) ? (
                <p className='text-green'>Email is valid!</p>
              ) : (
                <p className='text-red'>Email is not valid!</p>
              )
            ) : (
              <></>
            )}
            <button
              className='w-[180px] h-[46px] rounded-[26px] text-sm font-bold bg-purple text-white hover:bg-white hover:text-purple uppercase'
              onClick={handlePostEmail}
              disabled={isLoading ? true : false}
            >
              {isLoading ? '...Loading' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
