import React, { useMemo } from 'react';
import { capitalize } from './format';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getAllTags } from '../redux/slice/tagSlice';
type Props = {
  title: string;
  description?: string;
};
const SetHeader: React.FC<Props> = ({ title, description }) => {
  const newTitle = title.split('/')[1]
    ? capitalize(title.split('/')[1])
    : capitalize(title);
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
    </>
  );
};

export default React.memo(SetHeader);
