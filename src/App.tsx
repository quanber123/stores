import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/common/Loading';
const Header = lazy(() => import('@/components/common/Header'));
const Scroll = lazy(() => import('@/components/common/Scroll'));
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Outlet />
        <Scroll />
      </Suspense>
    </>
  );
}

export default App;
