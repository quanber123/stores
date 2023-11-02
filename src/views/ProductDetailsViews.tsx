import { useParams } from 'react-router-dom';
import { useRef, useLayoutEffect } from 'react';
import DescriptionProduct from '@/components/pages/product-details/Description';
import MoreInformationProduct from '@/components/pages/product-details/MoreInformation';
import RelatedProducts from '@/components/pages/product-details/RelatedProducts';
import gsap from 'gsap';
import { products } from '@/fake-data/data';
function ProductDetailsViews() {
  const { id } = useParams();
  const descriptionProductRef = useRef(null);
  const MoreInformationProductRef = useRef(null);
  const relatedRef = useRef(null);
  const findById = products.find((p) => p.id === Number(id));
  const relatedProduct = products.filter((p) => p.id !== Number(id));
  console.log(findById);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(descriptionProductRef.current, {
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
        y: 200,
        opacity: 0,
        duration: 1,
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <main className='pt-[120px] relative'>
      {findById ? (
        <>
          <DescriptionProduct
            product={findById}
            refEl={descriptionProductRef}
          />
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
