
import React from 'react';
import { useAppContext } from '../contexts/ProjectsContext';

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.254 6.254l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const Hero: React.FC = () => {
    const { appData } = useAppContext();
    const heroImageUrl = appData.heroImageUrl || "https://picsum.photos/seed/developer-portrait/500/500";
  return (
    <section id="home" className="min-h-screen flex items-center bg-white dark:bg-[#0a192f] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[15vw] md:text-[12rem] font-black text-slate-200 dark:text-slate-800 opacity-40 dark:opacity-20 select-none transform -translate-y-10">
                STAR
            </div>
        </div>

        <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between z-10">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                <p className="text-2xl text-slate-600 dark:text-slate-300">// Hello</p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mt-2">
                    I'm <span className="text-red-500">Starpro</span> a full-stack web designer and developer.
                </h1>
                <a
                    href="#contacts"
                    className="inline-flex items-center justify-center mt-8 px-8 py-3 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-semibold rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                >
                    <PhoneIcon />
                    CONTACT ME
                </a>
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 bg-red-500 rounded-[3rem] transform rotate-6"></div>
                    <img 
                        src={heroImageUrl}
                        alt="Starpro" 
                        className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl"
                    />
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;