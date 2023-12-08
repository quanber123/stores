type PropsBars = {
  handleDropdownRoutes: () => void;
  dropdownRoutes: boolean;
};
function Bars({ handleDropdownRoutes, dropdownRoutes }: PropsBars) {
  return (
    <div
      className={`tablet:hidden relative m-auto w-[32px] h-[48px] cursor-pointer flex flex-col items-center justify-center`}
      onClick={handleDropdownRoutes}
    >
      <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
      <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
      <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
    </div>
  );
}

export default Bars;
