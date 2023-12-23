import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef, useLayoutEffect } from 'react';
import RelatedProducts from '@/components/pages/product-details/RelatedProducts';
import gsap from 'gsap';
import { useGetProductByIdQuery } from '@/store/features/productFeatures';
import Loading from '@/components/common/Loading/Loading';
import Images from '@/components/pages/product-details/Images';
import Description from '@/components/pages/product-details/Description';
import ProductDetails from '@/components/pages/product-details/ProductsDetails';
function ProductDetailsViews() {
  const { id } = useParams();
  const {
    data: dataProduct,
    error: errorProduct,
    isSuccess: isSuccessProduct,
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct,
  } = useGetProductByIdQuery(id, { skip: !id });
  const imageRef = useRef(null);
  const productRef = useRef(null);
  const descriptionRef = useRef(null);
  const relatedRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        imageRef.current &&
        productRef.current &&
        descriptionRef.current &&
        relatedRef.current
      ) {
        gsap.from(imageRef.current, {
          x: -200,
          opacity: 0,
          duration: 1,
        });
        gsap.from(productRef.current, {
          x: 200,
          opacity: 0,
          duration: 1,
        });
        gsap.from(descriptionRef.current, {
          x: -200,
          opacity: 0,
          duration: 1,
        });
        gsap.from(relatedRef.current, {
          opacity: 0,
          duration: 1,
        });
      }
    });
    return () => {
      ctx.revert();
    };
  }, [dataProduct, id]);
  if (isLoadingProduct || isFetchingProduct) {
    return <Loading />;
  }
  if (errorProduct) {
    return <Navigate to={`/not-found/${id}`} />;
  }
  return isSuccessProduct && dataProduct ? (
    <main className='mt-[40px]'>
      <article className='container flex flex-col laptop:flex-row justify-between gap-[40px]'>
        <Images product={dataProduct.product} refEl={imageRef} />
        <ProductDetails product={dataProduct.product} refEl={productRef} />
      </article>
      <Description product={dataProduct.product} refEl={descriptionRef} />
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
