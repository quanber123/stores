function Buttons() {
  return (
    <div className='ml-auto flex items-center gap-[20px]'>
      <button className='hidden tablet:block font-bold'>Login</button>
      <button className='px-5 py-2 font-bold bg-semiBoldGray text-white hover:bg-purple rounded-[28px]'>
        Register
      </button>
    </div>
  );
}

export default Buttons;
