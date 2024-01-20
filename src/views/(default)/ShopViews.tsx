import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  getCurrentPageProduct,
  setAllProducts,
} from '@/services/redux/slice/productSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/services/redux/features/productFeatures';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
import ProductFilter from '@/components/pages/(default)/shop/ProductFilter';
import ProductList from '@/components/pages/(default)/shop/ProductList';
import ProductNotFound from '@/components/pages/(default)/shop/ProductNotFound';
import SetHeader from '@/services/utils/set-header';

function ShopViews() {
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPageProduct = useSelector(getCurrentPageProduct);
  const currentPage = Number(searchQuery.get('page')) || currentPageProduct;
  const {
    data: dataProducts,
    isSuccess: isSuccessProduct,
    isFetching: isFetchingProduct,
  } = useGetProductsQuery(
    {
      search: searchQuery.toString(),
    },
    { skip: !searchQuery.size }
  );

  useLayoutEffect(() => {
    setSearchQuery((prevQuery) => {
      const newQuery = new URLSearchParams(prevQuery);
      newQuery.set('page', currentPage?.toString() as string);
      return newQuery.toString();
    });
  }, []);

  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(setAllProducts(dataProducts));
    }
  }, [isSuccessProduct, dataProducts, searchQuery]);
  return (
    <>
      <SetHeader
        title={location.pathname}
        description={`Explore cozastore's fashion products`}
        isBlockIndex={false}
      />
      <main className='gap-[40px]'>
        <ProductFilter />
        {isFetchingProduct && <LoadingProduct />}
        {products?.length && !isFetchingProduct && <ProductList />}
        {products?.length === 0 && !isFetchingProduct && <ProductNotFound />}
      </main>
    </>
  );
}

export default ShopViews;
