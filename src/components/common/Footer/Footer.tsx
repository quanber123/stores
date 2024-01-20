import { getAllCategories } from '@/services/redux/slice/labelSlice';
import scrollElement from '@/services/utils/scroll-elements';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Paragraph({ title }: { title: string }) {
  return <p className='text-md text-white font-bold uppercase'>{title}</p>;
}
function Footer() {
  const categories = useSelector(getAllCategories);
  const helps = ['Track Order', 'Returns', 'Shipping', 'FAQs'];
  const navigate = useNavigate();
  const handleLinkClick = (name: string) => {
    navigate(`/shop?page=1&category=${name}`);
    scrollElement();
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
    <footer className='py-[75px] bg-darkGray text-lightGray'>
      <div
        className='container grid gap-[40px]'
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
      >
        <div className='flex flex-col gap-[20px]'>
          <Paragraph title='Categories' />
          <ul className='flex flex-col gap-[10px]'>{renderedCategories}</ul>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <Paragraph title='Help' />
          <ul className='flex flex-col gap-[10px]'>{renderHelps}</ul>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <Paragraph title='Get in touch' />
          <p className='text-sm'>
            Any questions? Let us know in store at 8th floor, 379 Hudson St, New
            York, NY 10018 or call us on (+1) 96 716 6879
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
