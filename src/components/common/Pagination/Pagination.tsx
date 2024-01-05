import React, { useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
type Props = {
  totalPage: number;
};
const Pagination: React.FC<Props> = ({ totalPage }) => {
  const [query, setQuery] = useSearchParams();
  const currPage = Number(query.get('page')) - 1 || 0;
  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      const newPage = selectedItem.selected + 1;
      setQuery((prevQuery) => {
        const newQuery = new URLSearchParams(prevQuery);
        newQuery.set('page', newPage.toString());
        return newQuery.toString();
      });
    },
    [currPage, totalPage]
  );
  return (
    <ReactPaginate
      forcePage={currPage}
      className='flex items-center gap-[10px] font-bold text-darkGray'
      nextLabel='Next'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      marginPagesDisplayed={3}
      pageCount={totalPage}
      previousLabel='Previous'
      pageClassName='border-2 border-lightGray w-[36px] h-[32px] rounded-[4px] flex justify-center items-center cursor-pointer'
      pageLinkClassName='w-full h-full flex justify-center items-center'
      nextClassName='text-darkGray'
      breakLabel='...'
      breakClassName='page-item'
      containerClassName='pagination'
      activeClassName='text-purple border border-purple'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
