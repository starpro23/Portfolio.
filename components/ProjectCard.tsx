import React from 'react';

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
}

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description, technologies, liveUrl, repoUrl }) => {
  return (
    <div className="bg-white dark:bg-[#0a192f] rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative hover:shadow-red-500/40">
      
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`View project ${title}`}>
        <span className="sr-only">View project {title}</span>
      </a>

      <div className="overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover object-top transition-all duration-300 transform group-hover:scale-105" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
            <div className="flex items-center space-x-4 relative z-20">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} Github Repository`} className="text-slate-500 dark:text-slate-400 hover:text-red-500 transition-all duration-300 hover:drop-shadow-[0_0_5px_#ef4444]">
                    <GitHubIcon />
                </a>
            </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">{description}</p>
        
        <ul className="flex flex-wrap gap-2">
          {(technologies || []).map((tech, index) => (
            <li key={index} className="text-sm bg-red-100 text-red-700 dark:bg-slate-700 dark:text-red-400 px-3 py-1 rounded-full">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;