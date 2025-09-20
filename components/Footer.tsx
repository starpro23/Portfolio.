import React from 'react';

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.177a4.823 4.823 0 100 9.646 4.823 4.823 0 000-9.646zm0 7.854a3.03 3.03 0 110-6.06 3.03 3.03 0 010 6.06zM20.577 6.223a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" clipRule="evenodd" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.5 15.5V8.5l6 3.5-6 3.5z" clipRule="evenodd" />
  </svg>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 dark:bg-black text-slate-400 py-12">
            <div className="container mx-auto px-6 text-center flex flex-col items-center gap-8">
                
                {/* Navigation Links */}
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold">
                    <li><a href="#home" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">HOME</a></li>
                    <li><a href="#aboutme" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">ABOUT ME</a></li>
                    <li><a href="#skills" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">SKILLS</a></li>
                    <li><a href="#projects" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">PROJECTS</a></li>
                    <li><a href="#contacts" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">CONTACTS</a></li>
                </ul>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-6">
                    <a href="#" aria-label="Facebook" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-[0_0_5px_#ef4444]"><FacebookIcon /></a>
                    <a href="#" aria-label="Twitter" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-[0_0_5px_#ef4444]"><TwitterIcon /></a>
                    <a href="#" aria-label="Instagram" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-[0_0_5px_#ef4444]"><InstagramIcon /></a>
                    <a href="#" aria-label="YouTube" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-[0_0_5px_#ef4444]"><YouTubeIcon /></a>
                </div>
                
                {/* Contact Info */}
                <div className="text-sm">
                    <p>E-mail: <a href="mailto:23starpro.32@gmail.com" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">23starpro.32@gmail.com</a></p>
                    <p>Tel number: <a href="tel:0753579914" className="hover:text-red-500 dark:hover:text-white transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">0753579914</a></p>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 w-full pt-6 text-sm">
                    <p>All rights reserved. &copy; {new Date().getFullYear()}. Created by StarTech Group Solutions.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;