import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import { AppProvider } from './contexts/ProjectsContext';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const renderAdminRoutes = () => {
    if (isAuthenticated) {
      return <AdminDashboard />;
    }
    return <LoginPage />;
  };

  return (
    <AppProvider>
        <div className="text-slate-700 dark:text-slate-200">
            {route === '#/admin' ? renderAdminRoutes() : <Portfolio />}
        </div>
    </AppProvider>
  );
};

export default App;