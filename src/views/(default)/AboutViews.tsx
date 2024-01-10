import About from '@/components/pages/default/about/About';
import SetHeader from '@/services/utils/set-header';
import { useLocation } from 'react-router-dom';

function AboutViews() {
  const location = useLocation();
  return (
    <>
      <SetHeader title={location.pathname} />
      <main className='gap-[40px]'>
        <About />
      </main>
    </>
  );
}

export default AboutViews;
