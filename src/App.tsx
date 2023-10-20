import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Header = lazy(() => import('@/components/common/Header'));
function App() {
  return (
    <>
      <Suspense fallback={<div>...Loading</div>}>
        <Header />
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
