import React, { useState, useEffect } from 'react';
import { useAppContext, Project, ProjectData } from '../contexts/ProjectsContext';

interface ProjectFormProps {
  initialData: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onClose }) => {
  const { addProject, updateProject } = useAppContext();
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    liveUrl: '',
    repoUrl: '',
    description: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        liveUrl: initialData.liveUrl,
        repoUrl: initialData.repoUrl,
        description: initialData.description,
        technologies: initialData.technologies || [],
      });
    } else {
      setFormData({ title: '', liveUrl: '', repoUrl: '', description: '', technologies: [] });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, techInput.trim()],
        }));
      }
      setTechInput('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateProject(initialData.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <div className="bg-white dark:bg-[#112240] rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{initialData ? 'Edit Project' : 'Add New Project'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Project Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Live URL</label>
          <input type="url" name="liveUrl" id="liveUrl" value={formData.liveUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Repo URL</label>
          <input type="url" name="repoUrl" id="repoUrl" value={formData.repoUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"></textarea>
        </div>
        <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Technologies (press Enter to add)</label>
            <input
                type="text"
                id="technologies"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., React, Tailwind CSS"
            />
             <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map(tech => (
                    <span key={tech} className="flex items-center bg-red-100 text-red-800 dark:bg-slate-700 dark:text-red-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {tech}
                        <button type="button" onClick={() => removeTechnology(tech)} className="ml-2 text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-100">
                           &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">Save Project</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;