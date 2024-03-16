import { Navigate, useParams } from 'react-router-dom';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGetProductByIdQuery } from '@/services/redux/features/productFeatures';
import Loading from '@/components/common/Loading/Loading';
import Breadcrumbs from '@/components/(ui)/breadcrumbs/Breadcrumbs';
import RelatedProducts from '@/components/pages/(default)/product-details/RelatedProducts';
import Images from '@/components/pages/(default)/product-details/Images';
import Description from '@/components/pages/(default)/product-details/Description';
import ProductDetails from '@/components/pages/(default)/product-details/ProductsDetails';
function ProductDetailsViews() {
  const { id } = useParams();
  const {
    data: productData,
    error: errorProduct,
    isSuccess: isSuccessProduct,
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct,
  } = useGetProductByIdQuery(id, { skip: !id });
  const imageRef = useRef<HTMLElement | null>(null);
  const productRef = useRef<HTMLElement | null>(null);
  const descriptionRef = useRef<HTMLElement | null>(null);
  const relatedRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (
      imageRef.current &&
      productRef.current &&
      descriptionRef.current &&
      relatedRef.current
    ) {
      const ctx = gsap.context(() => {
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
      });
      return () => {
        ctx.revert();
      };
    }
  }, [productData, id]);
  if (isLoadingProduct || isFetchingProduct) {
    return <Loading />;
  }
  if (errorProduct) {
    return <Navigate to={`/not-found/${id}`} />;
  }
  return (
    isSuccessProduct &&
    productData &&
    !isFetchingProduct && (
      <main className='gap-[40px]'>
        <Breadcrumbs
          breadcrumbs={location.pathname}
          currentId={productData.product.name}
        />
        <article className='container flex flex-col laptop:flex-row justify-between gap-[40px]'>
          <Images product={productData.product} refEl={imageRef} />
          <ProductDetails product={productData.product} refEl={productRef} />
        </article>
        <Description product={productData.product} refEl={descriptionRef} />
        <RelatedProducts
          products={productData.relatedProducts}
          refEl={relatedRef}
        />
      </main>
    )
  );
}

export default ProductDetailsViews;
