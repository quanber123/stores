function CartList() {
  return (
    <div className='w-full border border-lightGray'>
      <div className='p-2 flex justify-between gap-[20px] text-sm font-bold'>
        <h3 className='w-1/3 text-center'>Product</h3>
        <h3 className='w-1/6'>Description</h3>
        <h3 className='w-1/6'>Price</h3>
        <h3 className='w-1/6'>Quantity</h3>
        <h3 className='w-1/6'>Total</h3>
      </div>
    </div>
  );
}

export default CartList;
