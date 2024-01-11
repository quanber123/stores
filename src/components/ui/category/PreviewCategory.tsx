import { Category } from '@/interfaces/interfaces';
import { capitalize } from '@/services/utils/format';
import { useNavigate } from 'react-router-dom';
type Props = {
  category: Category;
  refEl: (el: HTMLElement) => HTMLElement;
};
const PreviewCategory: React.FC<Props> = ({ category, refEl }) => {
  const navigate = useNavigate();
  return (
    <article ref={refEl} className='max-h-[270px] cursor-pointer'>
      <div className='category relative flex justify-center items-center border border-lightGray'>
        <img
          className='w-[296px] mobile:w-[332px] desktop:w-[396px] h-[210px] desktop:h-[268px]'
          src={category.image}
          alt={category.name}
          {...({ fetchpriority: 'high' } as React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >)}
        />
        <div className='absolute top-0 left-0 z-50 px-[17px] tablet:px-[34px] py-[19px] tablet:py-[38px] w-full h-full flex flex-col justify-between'>
          <div>
            <h4 className='font-bold text-md tablet:text-xl'>
              {capitalize(category.name)}
            </h4>
            <p>{capitalize(category.description)}</p>
          </div>
          <div className='font-bold text-sm text-center text-white btn-category'>
            <button onClick={() => navigate(`/shop?category=${category.name}`)}>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PreviewCategory;
