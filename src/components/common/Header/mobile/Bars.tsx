type PropsBars = {
  handleDropdownRoutes: () => void;
  dropdownRoutes: boolean;
};
function Bars({ handleDropdownRoutes, dropdownRoutes }: PropsBars) {
  return (
    <div className='flex items-center gap-[10px]'>
      <div
        className={`relative m-auto w-[24px] h-[42px] cursor-pointer`}
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
