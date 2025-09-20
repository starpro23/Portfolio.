import React, { useState } from 'react';

const StarproLogo = () => (
    <a href="#home" className="flex items-center space-x-2">
        <div className="relative font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
            <svg className="absolute -top-2.5 -left-3 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="relative z-10 px-2 py-0.5">STARPRO</span>
        </div>
    </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["HOME", "ABOUT ME", "SKILLS", "PROJECTS", "CONTACTS"];

  const NavLinkItems = () => (
    <>
      {navLinks.map(link => (
        <li key={link}>
            <a href={`#${link.toLowerCase().replace(' ', '')}`} className="block py-2 px-3 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 md:hover:bg-transparent rounded transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]" onClick={() => setIsOpen(false)}>
                {link}
            </a>
        </li>
      ))}
    </>
  );

  return (
    <header className="bg-white/80 dark:bg-[#0a192f]/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <StarproLogo />
                
                <div className="hidden md:flex items-center space-x-2">
                    <ul className="flex items-center space-x-8 font-semibold">
                        <NavLinkItems />
                    </ul>
                </div>

                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden mt-4">
                    <ul className="flex flex-col space-y-2">
                       <NavLinkItems />
                    </ul>
                </div>
            )}
        </nav>
    </header>
  );
};

export default Header;