import { useRef, useLayoutEffect } from 'react';
import LazyLoadImage from '@/services/utils/lazyload-image';
import SingleAbout from './SingleAbout';
import gsap from 'gsap';
import bgImg from '@/assets/images/bg-01.jpg.webp';
import src1 from '@/assets/images/about-01.jpg.webp';
import src2 from '@/assets/images/about-02.jpg.webp';
function About() {
  const aboutRefs = useRef<Array<HTMLElement | null>>([]);
  const aboutTitleRef = useRef(null);
  const aboutImgRef = useRef(null);
  const abouts = [
    {
      title: 'Our Story',
      srcImg: src1,
      alt: 'Our Story',
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.',
        'Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.',
        'Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879',
      ],
      quotes: {
        content: '',
        author: '',
      },
    },
    {
      title: 'Our Mission',
      srcImg: src2,
      alt: 'Our Mission',
      description: [
        'Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.',
      ],
      quotes: {
        content:
          "Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.",
        author: 'Steve Job’s',
      },
    },
  ];
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutTitleRef.current, {
        y: -100,
        opacity: 0,
        duration: 2.5,
        delay: 0.5,
        ease: 'elastic',
      });
      gsap.from(aboutImgRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
      });
      const evenAboutRefs = aboutRefs.current.filter(
        (_, index) => index % 2 === 0
      );
      const oddAboutRefs = aboutRefs.current.filter(
        (_, index) => index % 2 === 1
      );
      evenAboutRefs.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              x: -200,
              y: 200,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.3,
            }
          );
        }
      });
      oddAboutRefs.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              x: 200,
              y: 200,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.3,
            }
          );
        }
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  const renderedAbout = abouts.map((a, index) => {
    return (
      <SingleAbout
        key={index}
        title={a.title}
        srcImg={a.srcImg}
        alt={a.alt}
        description={a.description}
        quotes={a.quotes}
        refEl={(el) => (aboutRefs.current[index] = el)}
      />
    );
  });
  return (
    <>
      <section className={`relative h-[240px] overflow-hidden`}>
        <div className='w-full h-full' ref={aboutImgRef}>
          <LazyLoadImage src={bgImg} alt='' className='w-full h-full' />
        </div>
        <h2
          ref={aboutTitleRef}
          className='absolute top-1/2 left-1/2 z-20 text-white text-3xl font-bold'
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          About
        </h2>
      </section>
      <section className={`container flex flex-col gap-[80px]`}>
        {renderedAbout}
      </section>
    </>
  );
}

export default About;
