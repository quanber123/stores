import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useLayoutEffect } from 'react';
import ProductDetails from '@/components/pages/product-details/ProductsDetails';
import MoreInformationProduct from '@/components/pages/product-details/MoreInformation';
import RelatedProducts from '@/components/pages/product-details/RelatedProducts';
import gsap from 'gsap';
import { useGetProductByIdQuery } from '@/store/features/productFeatures';
import Loading from '@/components/common/Loading/Loading';
import { Product } from '@/interfaces/interfaces';
function ProductDetailsViews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: dataProduct,
    error: errorProduct,
    isSuccess: isSuccessProduct,
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct,
  } = useGetProductByIdQuery(id) as {
    data?: {
      product: Product;
      relatedProducts: Product[];
    };
    error?: any;
    isSuccess: boolean;
    isLoading: boolean;
    isFetching: boolean;
  };
  const productRef = useRef(null);
  const MoreInformationProductRef = useRef(null);
  const relatedRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(productRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
      });
      gsap.from(MoreInformationProductRef.current, {
        x: -200,
        opacity: 0,
        duration: 1,
      });
      gsap.from(relatedRef.current, {
        opacity: 0,
        duration: 1,
      });
    });
    return () => {
      ctx.revert();
    };
  }, [dataProduct]);
  if (isLoadingProduct || isFetchingProduct) {
    return <Loading />;
  }
  if (errorProduct) {
    return <>{navigate('/not-found', { replace: true })}</>;
  }
  return isSuccessProduct && dataProduct ? (
    <main className='py-[120px]'>
      <ProductDetails product={dataProduct.product} refEl={productRef} />
      <MoreInformationProduct
        product={dataProduct.product}
        refEl={MoreInformationProductRef}
      />
      <RelatedProducts
        products={dataProduct.relatedProducts}
        refEl={relatedRef}
      />
    </main>
  ) : (
    <></>
  );
}

export default ProductDetailsViews;
