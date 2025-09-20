import React from 'react';
import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAppContext } from '../contexts/ProjectsContext';

const Projects: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const { appData } = useAppContext();
  const { projects } = appData;

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 bg-slate-100 dark:bg-[#112240]">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">PROJECTS</h2>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <p className="text-xl">New projects coming soon. Stay tuned!</p>
                </div>
            )}
        </div>
    </section>
  );
};

export default Projects;
