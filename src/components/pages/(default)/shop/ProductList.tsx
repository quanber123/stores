import { useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import PreviewProduct from '@/components/(ui)/product/PreviewProduct';
import Pagination from '@/components/(ui)/pagination/Pagination';
import { Product } from '@/interfaces/interfaces';
type Props = {
  products: Product[];
  total: number;
};
const ProductList: React.FC<Props> = ({ products, total }) => {
  const productRefs = useRef<Array<HTMLElement | null>>([]);
  const renderedProducts = useMemo(
    () =>
      products?.map((p, index) => {
        return (
          <PreviewProduct
            key={index}
            product={p}
            refEl={(el) => (productRefs.current[index] = el)}
          />
        );
      }),
    [products]
  );
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      productRefs.current
        .filter((ref) => ref)
        .forEach((ref, index) => {
          gsap.fromTo(
            ref,
            {
              x: 200,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.3,
            }
          );
        });
    });
    return () => ctx.revert();
  }, [products]);
  return (
    <section className='container min-h-[60vh] m-auto flex flex-col gap-[40px]'>
      <div className='grid laptop:grid-cols-2 desktop:grid-cols-4 gap-[40px]'>
        {renderedProducts}
      </div>
      <Pagination totalPage={total as number} />
    </section>
  );
};

export default ProductList;
