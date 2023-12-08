import scrollElement from '@/utils/scroll-elements';
import { NavLink } from 'react-router-dom';
type PropsRoutes = {
  handleDropdownRoutes: () => void;
  routeRefs: any;
};
function Router({ handleDropdownRoutes, routeRefs }: PropsRoutes) {
  const routes = [
    {
      link: 'about',
    },
    {
      link: 'shop',
    },
    { link: 'blog' },
    // {
    //   link: 'contact',
    // },
  ];
  const changeRoute = () => {
    handleDropdownRoutes();
    scrollElement();
  };
  const route = routes.map((r, index) => {
    return (
      <li
        key={index}
        className='capitalize'
        ref={(el) => (routeRefs.current[index] = el)}
      >
        <NavLink
          to={r.link}
          className={({ isActive }) =>
            isActive ? 'text-purple w-max' : 'w-max'
          }
          onClick={changeRoute}
          end
        >
          {r.link}
        </NavLink>
      </li>
    );
  });
  return <ul className='p-[16px] h-max'>{route}</ul>;
}

export default Router;
