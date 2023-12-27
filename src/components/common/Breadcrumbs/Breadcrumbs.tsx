import { capitalize, capitalizeFirstLetter } from '@/utils/format';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
type Props = {
  breadcrumbs: string;
  currentId?: string;
};
const Breadcrumbs: React.FC<Props> = ({ breadcrumbs, currentId }) => {
  const subNavigate = breadcrumbs.split('/')[1];
  const renderedBreadCrumbs = useMemo(() => {
    return currentId ? (
      <li>
        <Link to={`/${subNavigate}`}>{capitalize(subNavigate)}</Link>
      </li>
    ) : (
      <li className='text-purple'>{capitalize(subNavigate)}</li>
    );
  }, [breadcrumbs]);
  return (
    <section className='container text-white'>
      <ul
        className={`flex items-center gap-[10px] py-8 ${
          subNavigate === 'blogs' ? 'text-white' : 'text-mediumGray'
        } font-bold`}
      >
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>&gt;</li>
        {renderedBreadCrumbs}
        {currentId ? (
          <>
            <li>&gt;</li>
            <li className='text-purple'>{capitalizeFirstLetter(currentId)}</li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
};

export default Breadcrumbs;
