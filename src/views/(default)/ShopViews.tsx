import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  getCurrentPageProduct,
  setAllProducts,
} from '@/services/redux/slice/productSlice';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/services/redux/features/productFeatures';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
import ProductFilter from '@/components/pages/default/shop/ProductFilter';
import ProductList from '@/components/pages/default/shop/ProductList';
import ProductNotFound from '@/components/pages/default/shop/ProductNotFound';
('@/components/common/Loading/LoadingData');

function ShopViews() {
  const dispatch = useDispatch();
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

  useEffect(() => {
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

  const products = useSelector(getAllProducts);

  return (
    <main className='gap-[40px]'>
      <ProductFilter />
      {isFetchingProduct ? <LoadingProduct /> : null}
      {products && products.length && !isFetchingProduct ? (
        <ProductList />
      ) : null}
      {!products || (products.length === 0 && !isFetchingProduct) ? (
        <ProductNotFound />
      ) : null}
    </main>
  );
}

export default ShopViews;
