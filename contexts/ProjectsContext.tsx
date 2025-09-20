import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface Project {
    id: string;
    title: string;
    liveUrl: string;
    repoUrl: string;
    description: string;
    imageUrl: string;
    technologies: string[];
}

export type ProjectData = Omit<Project, 'id' | 'imageUrl'>;

export interface Stat {
    value: number;
    label: string;
    suffix: string;
}

interface AppData {
    projects: Project[];
    heroImageUrl: string;
    stats: Stat[];
}

interface AppContextType {
    appData: AppData;
    addProject: (project: ProjectData) => void;
    updateProject: (id: string, project: ProjectData) => void;
    deleteProject: (id: string) => void;
    updateHeroImage: (url: string) => void;
    updateStats: (stats: Stat[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getThumbnailUrl = (url: string) => {
    if (!url) return '';
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=400`;
};

const defaultHeroImage = "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const defaultStats: Stat[] = [
    { value: 5, label: "Complete Projects", suffix: "+" },
    { value: 95, label: "Client Satisfaction", suffix: "%" },
    { value: 2, label: "Years of experience", suffix: "+" },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appData, setAppData] = useState<AppData>({
        projects: [],
        heroImageUrl: defaultHeroImage,
        stats: defaultStats,
    });

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('starpro_portfolio_data');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                // Ensure data has fallbacks
                if (!parsedData.heroImageUrl) {
                    parsedData.heroImageUrl = defaultHeroImage;
                }
                if (!parsedData.stats || parsedData.stats.length === 0) {
                    parsedData.stats = defaultStats;
                }
                setAppData(parsedData);
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    const saveData = (newAppData: AppData) => {
        try {
            localStorage.setItem('starpro_portfolio_data', JSON.stringify(newAppData));
            setAppData(newAppData);
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    };

    const addProject = (projectData: ProjectData) => {
        const newProject: Project = {
            ...projectData,
            id: Date.now().toString(),
            imageUrl: getThumbnailUrl(projectData.liveUrl),
        };
        saveData({ ...appData, projects: [...appData.projects, newProject] });
    };

    const updateProject = (id: string, updatedData: ProjectData) => {
        const updatedProjects = appData.projects.map(p =>
            p.id === id ? { ...p, ...updatedData, imageUrl: getThumbnailUrl(updatedData.liveUrl) } : p
        );
        saveData({ ...appData, projects: updatedProjects });
    };

    const deleteProject = (id: string) => {
        const filteredProjects = appData.projects.filter(p => p.id !== id);
        saveData({ ...appData, projects: filteredProjects });
    };

    const updateHeroImage = (url: string) => {
        saveData({ ...appData, heroImageUrl: url });
    };

    const updateStats = (stats: Stat[]) => {
        saveData({ ...appData, stats });
    };

    return (
        <AppContext.Provider value={{ appData, addProject, updateProject, deleteProject, updateHeroImage, updateStats }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};