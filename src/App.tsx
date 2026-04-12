import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import BreakTime from "./pages/BreakTime";
import Timer from "./pages/timer";
import Recipes from "./pages/Recipes";
import RecipeEditor from "./pages/RecipeEditor";
import { TaskProvider } from "./lib/task-context";
import { MochiProvider, useMochi } from "./lib/mochi-context";
import { SimpleToastProvider } from "./components/SimpleToast";
import { MochiPet } from "./components/MochiPet";
import { MochiSettings } from "./components/MochiSettings";
import { Settings } from "lucide-react";
import React, { useState } from 'react';

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

// Wrapper component that has access to Mochi context
function AppContent() {
  const [isMochiSettingsOpen, setIsMochiSettingsOpen] = useState(false);
  const { toggleSleep, resetPosition, isSleeping } = useMochi();

  return (
    <>
      <ElectronRouter />
      
      {/* Mochi Pet - appears on all pages */}
      <MochiPet />
      
      {/* Mochi Settings Button */}
      <button
        onClick={() => setIsMochiSettingsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-[#D7C4FF] 
                   border-2 border-[#8B6F47] rounded-full 
                   flex items-center justify-center text-[#8B6F47]
                   hover:bg-white transition-colors
                   shadow-[4px_4px_0_0_#8B6F47] active:translate-y-1 active:shadow-none"
        title="Mochi Settings"
      >
        <Settings size={20} />
      </button>

      {/* Mochi Settings Dialog */}
      <MochiSettings
        isOpen={isMochiSettingsOpen}
        onClose={() => setIsMochiSettingsOpen(false)}
        onResetPosition={resetPosition}
        onToggleSleep={toggleSleep}
        isSleeping={isSleeping}
      />
    </>
  );
}

function App() {
  return (
    <TaskProvider>
      <MochiProvider>
        <SimpleToastProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </SimpleToastProvider>
      </MochiProvider>
    </TaskProvider>
  );
}

export default App;