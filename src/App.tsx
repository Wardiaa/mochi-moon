import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import BreakTime from "./pages/BreakTime";
import Timer from "./pages/timer";
import Recipes from "./pages/Recipes";
import RecipeEditor from "./pages/RecipeEditor";
import { TaskProvider } from "./lib/task-context";
import { SimpleToastProvider } from "./components/SimpleToast";
import React from 'react';

// Simple router pour Electron
function ElectronRouter() {
  const [currentPage, setCurrentPage] = React.useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  switch (currentPage) {
    case '/': return <Home />;
    case '/break': return <BreakTime />;
    case '/break/timer': return <Timer />;
    case '/recipes': return <Recipes />;
    case '/recipes/new': return <RecipeEditor />;
    default: return <Home />;
  }
}

function App() {
  return (
    <TaskProvider>
      <SimpleToastProvider>
        <TooltipProvider>
          <ElectronRouter />
        </TooltipProvider>
      </SimpleToastProvider>
    </TaskProvider>
  );
}

export default App;