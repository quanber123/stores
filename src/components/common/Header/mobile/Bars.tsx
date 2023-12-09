type PropsBars = {
  handleDropdownRoutes: () => void;
  dropdownRoutes: boolean;
};
function Bars({ handleDropdownRoutes, dropdownRoutes }: PropsBars) {
  return (
    <div className='flex items-center gap-[10px]'>
      <div
        className={`tablet:hidden relative m-auto w-[32px] h-[48px] cursor-pointer`}
        onClick={handleDropdownRoutes}
      >
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
      </div>
    </div>
  );
}

export default Bars;
