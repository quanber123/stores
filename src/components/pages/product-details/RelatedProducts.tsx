import { useMemo, LegacyRef } from 'react';
import PreviewProduct from '@/components/single/product/PreviewProduct';
import { Product } from '@/interfaces/interfaces';
type Props = {
  products: Array<Product>;
  refEl: LegacyRef<HTMLElement>;
};
const RelatedProducts: React.FC<Props> = ({ products, refEl }) => {
  const renderedProducts = useMemo(
    () =>
      products.map((p, index) => <PreviewProduct key={index} product={p} />),
    [products]
  );
  return (
    <section
      ref={refEl}
      className={`flex flex-col items-center justify-center gap-[20px]`}
    >
      <h2 className='text-xl tablet:text-4xl text-darkGray font-bold'>
        Related Products
      </h2>
      <div className='container m-auto product-list'>{renderedProducts}</div>
    </section>
  );
};

export default RelatedProducts;
