import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
function NotFoundViews() {
  const navigate = useNavigate();
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const btnRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        h2Ref.current,
        {
          y: -200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'elastic',
        }
      );
      gsap.fromTo(
        pRef.current,
        {
          x: 200,
          opacity: 0,
        },
        {
          x: '-50%',
          opacity: 1,
          duration: 2,
          delay: 0.5,
          ease: 'elastic',
        }
      );
      gsap.fromTo(
        btnRef.current,
        {
          x: -200,
          opacity: 0,
        },
        {
          x: '-50%',
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: 'elastic',
        }
      );
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <main
      className='absolute top-1/2 left-1/2 -z-20'
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div className='container flex flex-col justify-center items-center gap-[20px]'>
        <h2
          ref={h2Ref}
          className='text-[72px] mobileLg:text-[158px] laptop:text-[236px] font-thin'
        >
          OOPS!
        </h2>
        <p
          ref={pRef}
          className='absolute -bottom-[15%] mobileLg:bottom-[12%] laptop:bottom-[15%] left-1/2 mobileLg:-translate-y-1/2 w-max px-4 py-[8px] laptop:py-[12px] bg-white text-base mobileLg:text-lg laptop:text-xl laptop:tracking-wider'
        >
          404 - THE PAGE CAN'T BE FOUND
        </p>
        <div
          ref={btnRef}
          className='w-full absolute -bottom-[100%] mobileLg:-bottom-[20%] laptop:-bottom-[10%] left-1/2 -translate-y-1/2 flex justify-center items-center'
        >
          <button
            className='uppercase laptop:bottom-0 py-[13px] px-2 mobileLg:px-[23px] bg-purple text-white hover:bg-semiBoldGray mobileLg:text-md font-bold'
            onClick={() => navigate('/', { replace: true })}
          >
            Go to homepage
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFoundViews;
