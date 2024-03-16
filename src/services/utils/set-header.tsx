import React, { useMemo } from 'react';
import { capitalize } from './format';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getAllTags } from '../redux/slice/labelSlice';

type Props = {
  title: string;
  description?: string;
  isBlockIndex: boolean;
};

const SetHeader: React.FC<Props> = ({ title, description, isBlockIndex }) => {
  const newTitle = useMemo(() => {
    return capitalize(title.split('/')[1]);
  }, [title]);

  const tags = useSelector(getAllTags);
  const setHeaderKeywords = useMemo(() => {
    return tags.map((t) => t.name).join(',');
  }, [tags]);

  return (
    <Helmet>
      {title && (
        <title>{newTitle ? `${newTitle} | CozaStore` : 'CozaStore'}</title>
      )}
      {description && (
        <>
          <meta property='og:description' content={description} />
          <meta name='description' content={description} />
        </>
      )}
      {tags.length > 0 && <meta name='keywords' content={setHeaderKeywords} />}
      <meta
        name='robots'
        content={isBlockIndex ? 'noindex, nofollow' : 'index, follow'}
      />
    </Helmet>
  );
};

export default SetHeader;
