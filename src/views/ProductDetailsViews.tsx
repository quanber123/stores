import { useParams } from 'react-router-dom';
import { useRef, useLayoutEffect } from 'react';
import ProductDetails from '@/components/pages/product-details/ProductsDetails';
import MoreInformationProduct from '@/components/pages/product-details/MoreInformation';
import RelatedProducts from '@/components/pages/product-details/RelatedProducts';
import gsap from 'gsap';
import { products } from '@/fake-data/data';
function ProductDetailsViews() {
  const { id } = useParams();
  const productRef = useRef(null);
  const MoreInformationProductRef = useRef(null);
  const relatedRef = useRef(null);
  const findById = products.find((p) => p.id === Number(id));
  const relatedProduct = products.filter((p) => p.id !== Number(id));
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
  }, []);
  return (
    <main className='pt-[120px]'>
      {findById ? (
        <>
          <ProductDetails product={findById} refEl={productRef} />
          <MoreInformationProduct
            tabs={findById.tabs}
            refEl={MoreInformationProductRef}
          />
          <RelatedProducts products={relatedProduct} refEl={relatedRef} />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default ProductDetailsViews;
