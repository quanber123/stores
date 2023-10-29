import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/common/Loading';
const Header = lazy(() => import('@/components/common/Header'));
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
