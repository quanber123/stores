import About from '@/components/pages/default/about/About';
import { useLocation } from 'react-router-dom';

function AboutViews() {
  const location = useLocation();
  console.log(location);
  return (
    <main className='gap-[40px]'>
      <About />
    </main>
  );
}

export default AboutViews;
