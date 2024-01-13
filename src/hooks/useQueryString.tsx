import { formatQueryString } from '@/services/utils/format';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const queryString = useMemo(() => {
    return formatQueryString(searchQuery.toString());
  }, [searchQuery]);
  const handleChangeQuery = useCallback(
    (name: string, value: string) => {
      setSearchQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        if (value === 'default') {
          for (let key in queryString) {
            newQuery.delete(key);
          }
          newQuery.set('page', '1');
        } else {
          newQuery.set(name, value);
        }
        if (name === 'category') {
          newQuery.set('page', '1');
        }
        if (name === 'search' && value === '') {
          newQuery.delete('search');
        }
        return newQuery.toString();
      });
    },
    [searchQuery]
  );
  return [queryString, handleChangeQuery];
};

export default useQueryString;
