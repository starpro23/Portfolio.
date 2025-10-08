import React, { useState, useEffect } from 'react';
import { useAppContext, Project } from '../contexts/ProjectsContext';
import ProjectForm from './ProjectForm';
import { useAuth } from '../contexts/AuthContext';

type AdminTab = 'projects' | 'hero' | 'stats';

const AdminDashboard: React.FC = () => {
    const { appData, deleteProject, updateHeroImage, updateStats } = useAppContext();
    const { projects, heroImageUrl, stats } = appData;
    const { logout } = useAuth();
    
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [statValues, setStatValues] = useState(stats.map(s => s.value));
    const [activeTab, setActiveTab] = useState<AdminTab>('projects');

    useEffect(() => {
        setStatValues(stats.map(s => s.value));
    }, [stats]);

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingProject(null);
        setIsFormVisible(true);
    };

    const handleFormClose = () => {
        setIsFormVisible(false);
        setEditingProject(null);
    };

    const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB size limit
            alert("File is too large. Please select an image smaller than 2MB.");
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                updateHeroImage(reader.result);
                alert("Hero image updated successfully!");
            }
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            alert("Failed to read the image file. Please try again.");
        };
        reader.readAsDataURL(file);
    };

    const handleStatChange = (index: number, value: string) => {
        const newValues = [...statValues];
        newValues[index] = Number(value) || 0;
        setStatValues(newValues);
    };

    const handleStatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newStats = stats.map((stat, index) => ({
            ...stat,
            value: statValues[index],
        }));
        updateStats(newStats);
        alert('Stats updated successfully!');
    };

    const navItems = [
        { id: 'projects', label: 'Manage Projects' },
        { id: 'hero', label: 'Manage Hero Image' },
        { id: 'stats', label: 'Manage About Stats' },
    ];

    const getTabClassName = (tabId: AdminTab) => {
        const base = "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none";
        if (activeTab === tabId) {
            return `${base} border-red-500 text-red-600 dark:text-red-400`;
        }
        return `${base} border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-500`;
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-[#0a192f]">
            <header className="bg-white dark:bg-[#112240] shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                     <div className="flex items-center space-x-4">
                        <a href="/#" className="text-red-500 hover:underline transition-all duration-300 hover:[text-shadow:0_0_8px_#ef4444]">Go to Main Site</a>
                        <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-slate-700 dark:bg-slate-600 border border-transparent rounded-md shadow-sm hover:bg-slate-800 dark:hover:bg-slate-500 transition-shadow hover:shadow-md hover:shadow-red-500/50">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">Content Management</h2>
                
                {/* Navigation Tabs */}
                <div className="mb-8 border-b border-slate-300 dark:border-slate-700">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {navItems.map(item => (
                             <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as AdminTab)}
                                className={getTabClassName(item.id as AdminTab)}
                                aria-current={activeTab === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'hero' && (
                        <div id="hero-management">
                             <div className="bg-white dark:bg-[#112240] rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
                                <div className="flex-grow w-full">
                                    <label htmlFor="heroImageUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Upload New Hero Image
                                    </label>
                                    <input
                                        type="file"
                                        id="heroImageUpload"
                                        accept="image/*"
                                        onChange={handleHeroImageChange}
                                        className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-red-100 file:text-red-700
                                        dark:file:bg-red-900/20 dark:file:text-red-300
                                        hover:file:bg-red-200 dark:hover:file:bg-red-900/30
                                        cursor-pointer"
                                    />
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                        The image will be saved in your browser. Max file size: 2MB.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Image Preview:</p>
                                    <img src={heroImageUrl} alt="Hero Preview" className="w-48 h-32 object-cover rounded-md border border-slate-200 dark:border-slate-700" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div id="stats-management">
                             <div className="bg-white dark:bg-[#112240] rounded-lg shadow-lg p-6">
                                <form onSubmit={handleStatSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {stats.map((stat, index) => (
                                            <div key={stat.label}>
                                                <label htmlFor={`stat-${index}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {stat.label}
                                                </label>
                                                <div className="mt-1 flex items-center">
                                                    <input
                                                        type="number"
                                                        id={`stat-${index}`}
                                                        value={statValues[index]}
                                                        onChange={(e) => handleStatChange(index, e.target.value)}
                                                        className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                                    />
                                                    <span className="ml-2 text-slate-500 dark:text-slate-400">{stat.suffix}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">
                                            Save Stats
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'projects' && (
                        <div id="projects-management">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Your Projects</h2>
                                <button
                                    onClick={handleAddNew}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
                                >
                                    + Add New Project
                                </button>
                            </div>

                            {isFormVisible && (
                                <ProjectForm
                                    initialData={editingProject}
                                    onClose={handleFormClose}
                                />
                            )}

                            <div className="bg-white dark:bg-[#112240] rounded-lg shadow-lg overflow-hidden">
                                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {projects.length > 0 ? projects.map(project => (
                                        <li key={project.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div className="flex items-center gap-4">
                                                <img src={project.imageUrl} alt={project.title} className="w-24 h-16 object-cover rounded-md border border-slate-200 dark:border-slate-700" />
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{project.title}</h3>
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 truncate">{project.liveUrl}</a>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 mt-4 sm:mt-0 self-end sm:self-center">
                                                <button onClick={() => handleEdit(project)} className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded hover:bg-slate-300 dark:hover:bg-slate-500 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50">Edit</button>
                                                <button onClick={() => deleteProject(project.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">Delete</button>
                                            </div>
                                        </li>
                                    )) : (
                                        <li className="p-4 text-center text-slate-500 dark:text-slate-400">No projects found. Add one to get started!</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;