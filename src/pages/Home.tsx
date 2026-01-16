import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Home as HomeIcon, Coffee, Cherry, Gamepad2, Sparkles } from "lucide-react";
import { navigateTo } from "../utils/navigation";
import { TaskCard } from "../components/TaskCard";
import { TaskFormDialog } from "../components/TaskFormDialog";
import { useTasks } from "../lib/task-context";
import type { Task } from "../lib/types";

export default function Home() {
  const { tasks, isLoading, error, updateTask, deleteTask } = useTasks();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleToggle = async (id: number, currentCompleted: boolean) => {
    try {
      await updateTask(id, { completed: !currentCompleted });
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to abandon this quest?")) {
      try {
        await deleteTask(id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setTaskToEdit(null);
    setIsDialogOpen(true);
  };

  // Calculate XP
  const currentXP = tasks?.reduce((acc, task) => acc + (task.completed ? (task.xp || 10) : 0), 0) || 0;
  const nextLevelXP = Math.ceil((currentXP + 1) / 100) * 100;
  const progressPercent = (currentXP / nextLevelXP) * 100;

  const filteredTasks = tasks?.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center font-display text-[#8B6F47] animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#8B6F47] border-t-[#FFC4DD] rounded-full animate-spin" />
        <p>Loading Mochi Moon...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 font-pixel">
      Error loading quests. Refresh needed!
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-0 m-0 w-screen h-screen font-pixel">
      
      {/* Window Resize Handles */}
      <div className="window-resize-handle resize-right"></div>
      <div className="window-resize-handle resize-bottom"></div>
      <div className="window-resize-handle resize-corner"></div>
      
      {/* Main Window Container - Now it's the entire window */}
      <div className="w-full h-full bg-[#FFF8F0] flex flex-col overflow-hidden">
        
        {/* Title Bar with Window Controls */}
        <div className="h-12 bg-[#B4FFE6] border-b-4 border-[#8B6F47] flex items-center justify-between px-4 select-none draggable">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-[#8B6F47]" />
            <span className="font-display text-[#8B6F47] text-sm md:text-base tracking-tight pt-1">
              Mochi Moon Café Task Manager v1.0
            </span>
          </div>
          <div className="flex gap-2 non-draggable">
            {/* Minimize button */}
            <button 
              className="w-6 h-6 bg-[#B4FFE6] border-2 border-[#8B6F47] hover:bg-[#FFF4B4] flex items-center justify-center transition-colors"
              onClick={() => window.electronAPI?.minimizeApp()}
            >
              <span className="text-[#8B6F47] text-xs mb-2">_</span>
            </button>
            
            {/* Maximize/Restore button */}
            <button 
              className="w-6 h-6 bg-[#D7C4FF] border-2 border-[#8B6F47] hover:bg-white flex items-center justify-center transition-colors"
              onClick={() => window.electronAPI?.maximizeApp()}
            >
              <span className="text-[#8B6F47] text-xs">□</span>
            </button>
            
            {/* Close button */}
            <button 
              className="w-6 h-6 bg-[#FFC4DD] border-2 border-[#8B6F47] hover:bg-red-400 flex items-center justify-center transition-colors"
              onClick={() => window.electronAPI?.closeApp()}
            >
              <span className="text-[#8B6F47] text-xs">×</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Ribbon Nav */}
          <div className="w-16 md:w-20 bg-[#FFF4B4] border-r-4 border-[#8B6F47] flex flex-col items-center py-6 gap-6 z-10">
            <NavButton 
              icon={<HomeIcon size={24} />} 
              active 
              tooltip="Home"
              href="/"
            />
            <NavButton 
              icon={<Coffee size={24} />} 
              tooltip="Break Time" 
              href="/break"
            />
            <NavButton 
              icon={<Cherry size={24} />} 
              tooltip="Recipes" 
              href="/recipes"
            />
          
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
            
            {/* Header / Stats */}
            <div className="p-6 md:p-8 pb-2 flex justify-between items-end border-b-2 border-[#8B6F47]/10 bg-white/50 backdrop-blur-sm z-10">
              <div>
                <h1 className="text-2xl md:text-3xl font-display text-[#8B6F47] mb-2 drop-shadow-sm flex items-center gap-3">
                  Daily Quests <Sparkles className="text-[#FFC4DD]" />
                </h1>
                <p className="text-sm text-[#8B6F47]/70 font-pixel">
                  Welcome back! You have {tasks?.filter(t => !t.completed).length} active quests.
                </p>
              </div>
              
              <div className="flex gap-2 font-pixel text-xs">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
                <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
                <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Done</FilterButton>
              </div>
            </div>

            {/* Scrollable Canvas */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredTasks?.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}

                {/* Add New Card (Empty State) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreate}
                  className="h-32 border-4 border-dashed border-[#8B6F47]/30 rounded-lg flex flex-col items-center justify-center gap-2 text-[#8B6F47]/50 hover:bg-[#FFF8F0] hover:border-[#8B6F47] hover:text-[#8B6F47] transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#8B6F47]/10 group-hover:bg-[#FFC4DD] flex items-center justify-center transition-colors">
                    <Plus size={24} />
                  </div>
                  <span className="font-pixel text-sm">New Quest</span>
                </motion.button>
              </div>
            </div>

            {/* Floating Action Button for Mobile */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCreate}
              className="absolute bottom-20 right-6 md:hidden w-14 h-14 bg-[#FFC4DD] border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] rounded-full flex items-center justify-center z-50 text-[#8B6F47]"
            >
              <Plus size={28} />
            </motion.button>

            {/* Status Bar */}
            <div className="h-10 bg-[#B4FFE6] border-t-4 border-[#8B6F47] flex items-center px-4 font-pixel text-xs text-[#8B6F47] justify-between z-20">
              <div className="flex items-center gap-2 w-1/2">
                <span>XP to Lvl {Math.ceil(currentXP/100) + 1}:</span>
                <div className="h-4 flex-1 bg-white border-2 border-[#8B6F47] relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFC4DD] to-[#D7C4FF]"
                  />
                </div>
                <span>{currentXP} XP</span>
              </div>
              <div className="hidden md:block opacity-60">
                Mochi OS • Local Mode
              </div>
            </div>

          </div>
        </div>
      </div>

      <TaskFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

// Sub-components for cleaner file
interface NavButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  tooltip: string;
  href: string;
}

function NavButton({ icon, active, tooltip, href }: NavButtonProps) {
  return (
    <button
      onClick={() => navigateTo(href)}
      className={`
        w-10 h-10 flex items-center justify-center rounded-sm border-2 transition-all
        ${active 
          ? 'bg-[#FFC4DD] border-[#8B6F47] shadow-[2px_2px_0_0_#8B6F47]' 
          : 'bg-white border-transparent hover:border-[#8B6F47] hover:bg-[#FFF8F0]'
        }
      `}
      title={tooltip}
    >
      <span className="text-[#8B6F47]">{icon}</span>
    </button>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 border-2 border-[#8B6F47] text-[#8B6F47] transition-all text-[10px] uppercase font-bold
        ${active 
          ? 'bg-[#FFC4DD] shadow-[2px_2px_0_0_#8B6F47] -translate-y-0.5' 
          : 'bg-white hover:bg-[#FFF8F0]'
        }
      `}
    >
      {children}
    </button>
  );
}