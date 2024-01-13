import { DropdownContext } from '@/components/dropdown/hooks/dropdownContext';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import scrollElement from '@/services/utils/scroll-elements';
import { useCallback, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
type PropsRoutes = {
  routeRefs: any;
};
function Router({ routeRefs }: PropsRoutes) {
  const { closeAllModal } = useContext(ModalContext);
  const { closeDropdown } = useContext(DropdownContext);
  const routes = [
    {
      link: 'about',
    },
    {
      link: 'shop?page=1',
    },
    { link: 'blogs?page=1' },
    // {
    //   link: 'contact',
    // },
  ];
  const redirect = useCallback(() => {
    closeAllModal();
    closeDropdown();
    scrollElement();
  }, []);
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
            onClick={redirect}
            // state={{ prevUrl: location.pathname }}
            end
          >
            {r.link.split('?')[0]}
          </NavLink>
        </li>
      );
    });
  }, [routeRefs, routes]);
  return (
    <div>
      <ul className='p-[16px] h-max flex items-center gap-[20px] font-bold'>
        {route}
      </ul>
    </div>
  );
}

export default Router;
