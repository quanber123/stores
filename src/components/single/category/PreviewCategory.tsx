import { Category } from '@/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
type Props = {
  category: Category;
  refEl: (el: HTMLElement) => HTMLElement;
};
const PreviewCategory: React.FC<Props> = ({ category, refEl }) => {
  const navigate = useNavigate();
  return (
    <article ref={refEl} className='max-h-[270px] cursor-pointer'>
      <div className='category relative flex'>
        <img
          className='w-full h-full border border-lightGray'
          src={category.imgSrc}
          alt=''
        />
        <div className='absolute top-0 left-0 z-50 px-[17px] tablet:px-[34px] py-[19px] tablet:py-[38px] w-full h-full flex flex-col justify-between'>
          <div>
            <h4 className='font-bold text-md tablet:text-xl'>
              {category.title}
            </h4>
            <p>{category.description}</p>
          </div>
          <div className='font-bold text-white btn-category'>
            <button onClick={() => navigate('shop', { replace: true })}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PreviewCategory;
