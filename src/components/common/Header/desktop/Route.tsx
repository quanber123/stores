import { GlobalModalContext } from '@/components/modal/global/hooks/globalContext';
import scrollElement from '@/services/utils/scroll-elements';
import { useContext, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
type PropsRoutes = {
  routeRefs: any;
};
function Router({ routeRefs }: PropsRoutes) {
  const { closeAllModal } = useContext(GlobalModalContext);
  const routes = [
    {
      link: 'about',
    },
    {
      link: 'shop',
    },
    { link: 'blogs' },
    // {
    //   link: 'contact',
    // },
  ];
  const closeModal = () => {
    closeAllModal();
    scrollElement();
  };
  const location = useLocation();
  const route = useMemo(() => {
    return routes.map((r, index) => {
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
            state={{ prevUrl: location.pathname }}
            onClick={closeModal}
            end
          >
            {r.link}
          </NavLink>
        </li>
      );
    });
  }, [routeRefs]);
  return (
    <div>
      <ul className='p-[16px] h-max flex items-center gap-[20px] font-bold'>
        {route}
      </ul>
    </div>
  );
}

export default Router;
