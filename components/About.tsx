import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAppContext } from '../contexts/ProjectsContext';

const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);

          const counter = () => {
            start += increment;
            if (start < target) {
              setCount(Math.ceil(start));
              requestAnimationFrame(counter);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(counter);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
        if(currentRef) {
            observer.unobserve(currentRef);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <span ref={ref}>{count}</span>;
};


const About: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const { appData } = useAppContext();
  const { stats } = appData;

  return (
    <section ref={sectionRef} id="aboutme" className="py-20 md:py-32 bg-gradient-to-br from-sky-50 to-sky-100 dark:from-[#0d2440] dark:to-[#113a69]">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-serif text-center text-slate-900 dark:text-white mb-12">About me</h2>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                <div className="lg:w-1/2 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                        I'm a full-stack web designer and developer, creating user-friendly, responsive, and visually appealing websites. With expertise in front and back-end technologies, I deliver high-quality web solutions for a strong online presence.
                    </p>
                </div>
                <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <h3 className="text-6xl font-bold text-slate-900 dark:text-white">
                                <AnimatedCounter target={stat.value} />
                                <span className="text-red-500">{stat.suffix}</span>
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default About;