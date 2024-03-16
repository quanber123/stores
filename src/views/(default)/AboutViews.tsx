import About from '@/components/pages/(default)/about/About';
import SetHeader from '@/services/utils/set-header';
import { useLocation } from 'react-router-dom';
import '@/assets/css/about_views.css';
function AboutViews() {
  const location = useLocation();
  return (
    <>
      <SetHeader title={location.pathname} isBlockIndex={false} />
      <main className='gap-[40px]'>
        <About />
      </main>
    </>
  );
}

export default AboutViews;
