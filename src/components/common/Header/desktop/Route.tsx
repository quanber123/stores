import { ModalContext } from '@/components/modal/hooks/modalContext';
import scrollElement from '@/services/utils/scroll-elements';
import { useCallback, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
type PropsRoutes = {
  routeRefs: any;
};
function Router({ routeRefs }: PropsRoutes) {
  const { closeAllModal } = useContext(ModalContext);
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
  const closeModal = useCallback(() => {
    () => {
      closeAllModal();
      scrollElement();
    };
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
            // state={{ prevUrl: location.pathname }}
            onClick={closeModal}
            end
          >
            {r.link.split('?')[0]}
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
