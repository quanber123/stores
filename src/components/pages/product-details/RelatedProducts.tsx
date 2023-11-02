import { useMemo, LegacyRef } from 'react';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import { Product } from '@/interfaces/interfaces';
type Props = {
  products: Array<Product>;
  refEl: LegacyRef<HTMLElement>;
};
const RelatedProducts: React.FC<Props> = ({ products, refEl }) => {
  const renderedProduct = useMemo(() => {
    return products
      .slice(0, 4)
      .map((p, index) => <PreviewProduct key={index} product={p} />);
  }, [products]);
  return (
    <section
      ref={refEl}
      className={`w-full h-full flex flex-col items-center justify-center gap-[20px] overflow-hidden`}
    >
      <h2 className='text-xl tablet:text-4xl text-darkGray font-bold'>
        Related Products
      </h2>
      <div className='container product-list mt-4'>{renderedProduct}</div>
    </section>
  );
};

export default RelatedProducts;
