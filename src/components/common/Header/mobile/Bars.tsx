type Props = {
  dropdownRoutes: boolean;
  handleDropdownRoutes: () => void;
};
const Bars: React.FC<Props> = ({ dropdownRoutes, handleDropdownRoutes }) => {
  return (
    <section className='flex items-center gap-[10px]'>
      <div
        className={`relative m-auto w-[24px] h-[42px] cursor-pointer`}
        onClick={handleDropdownRoutes}
      >
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
        <span className={`bars ${dropdownRoutes ? 'active' : ''}`}></span>
      </div>
    </section>
  );
};

export default Bars;
