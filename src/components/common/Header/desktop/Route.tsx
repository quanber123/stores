import scrollElement from '@/utils/scroll-elements';
import { NavLink } from 'react-router-dom';
type PropsRoutes = {
  routeRefs: any;
};
function Router({ routeRefs }: PropsRoutes) {
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
          onClick={scrollElement}
          end
        >
          {r.link}
        </NavLink>
      </li>
    );
  });
  return (
    <div>
      <ul className='p-[16px] h-max flex items-center gap-[20px] font-bold'>
        {route}
      </ul>
    </div>
  );
}

export default Router;
