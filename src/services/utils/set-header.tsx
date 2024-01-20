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
    <>
      {title && (
        <Helmet>
          <title>{newTitle ? `${newTitle} | CozaStore` : 'CozaStore'}</title>
        </Helmet>
      )}
      {description && (
        <Helmet>
          <meta property='og:description' content={description} />
        </Helmet>
      )}
      {description && (
        <Helmet>
          <meta name='description' content={description} />
        </Helmet>
      )}
      {tags && (
        <Helmet>
          <meta name='keywords' content={setHeaderKeywords} />
        </Helmet>
      )}
      {isBlockIndex ? (
        <Helmet>
          <meta name='robots' content='noindex, nofollow' />
        </Helmet>
      ) : (
        <Helmet>
          <meta name='robots' content='index, follow' />
        </Helmet>
      )}
    </>
  );
};

export default React.memo(SetHeader);
