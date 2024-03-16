import { useLayoutEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/services/redux/features/productFeatures';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
import ProductFilter from '@/components/pages/(default)/shop/ProductFilter';
import ProductList from '@/components/pages/(default)/shop/ProductList';
import ProductNotFound from '@/components/pages/(default)/shop/ProductNotFound';
import SetHeader from '@/services/utils/set-header';

function ShopViews() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPage = Number(searchQuery.get('page')) || 1;
  const {
    data: dataProducts,
    isSuccess: isSuccessProduct,
    isFetching: isFetchingProduct,
  } = useGetProductsQuery(
    {
      search: searchQuery.toString(),
    },
    {
      skip: !searchQuery.size,
      pollingInterval: import.meta.env.VITE_DEFAULT_POLLING * 1000,
    }
  );

  useLayoutEffect(() => {
    setSearchQuery((prevQuery) => {
      const newQuery = new URLSearchParams(prevQuery);
      newQuery.set('page', currentPage?.toString() as string);
      return newQuery.toString();
    });
  }, []);
  return (
    <>
      <SetHeader
        title={location.pathname}
        description={`Explore cozastore's fashion products`}
        isBlockIndex={false}
      />
      <main className='gap-[20px] tablet:gap-[40px]'>
        <ProductFilter />
        {isFetchingProduct && !isSuccessProduct && <LoadingProduct />}
        {isSuccessProduct &&
          dataProducts.products.length > 0 &&
          !isFetchingProduct && (
            <ProductList
              products={dataProducts.products}
              total={dataProducts.totalPage}
            />
          )}
        {isSuccessProduct &&
          dataProducts.products.length === 0 &&
          !isFetchingProduct && <ProductNotFound />}
      </main>
    </>
  );
}

export default ShopViews;
