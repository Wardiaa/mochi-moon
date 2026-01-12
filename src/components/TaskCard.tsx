import { motion, AnimatePresence } from "framer-motion";
import { StrawberryCheckbox } from "./StrawberryCheckbox";
import { Trash2, Edit2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "../lib/utils";
import type { Task } from "../lib/types";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number, current: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const handleToggle = () => {
    if (!task.completed) {
      // Trigger confetti on completion
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#FFC4DD', '#B4FFE6', '#FFF4B4', '#D7C4FF']
      });
    }
    onToggle(task.id, task.completed || false);
  };

  const priorityColors = {
    high: "bg-[#FFC4DD]",    // Strawberry
    medium: "bg-[#FFF4B4]",  // Banana
    low: "bg-[#B4FFE6]",     // Mint
  };

  const priorityLabel = task.priority || "medium";
  const headerColor = priorityColors[priorityLabel as keyof typeof priorityColors];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: task.completed ? 1 : 0
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      whileHover={{ y: task.completed ? 0 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative flex flex-col w-full h-32 pixel-border bg-white overflow-hidden",
        task.completed && "opacity-60 grayscale-[0.5]"
      )}
    >
      {/* Pastel Plate Header */}
      <div className={cn("h-8 w-full border-b-2 border-[#8B6F47] flex items-center px-3 justify-between", headerColor)}>
        <div className="flex gap-1">
          {/* Macaron Dots */}
          <div className="w-2 h-2 rounded-full border border-[#8B6F47] bg-white/50" />
          <div className="w-2 h-2 rounded-full border border-[#8B6F47] bg-white/50" />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button 
            onClick={() => onEdit(task)}
            className="text-[#8B6F47] hover:text-[#4A4A4A] transition-colors"
          >
            <Edit2 size={12} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-[#8B6F47] hover:text-red-500 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-3 flex items-start gap-3 relative">
        <StrawberryCheckbox 
          checked={task.completed || false} 
          onChange={handleToggle} 
        />
        
        <div className="flex-1 min-w-0">
          <span className={cn(
            "text-sm font-pixel block leading-snug break-words text-[#8B6F47]",
            task.completed && "line-through text-[#8B6F47]/50"
          )}>
            {task.title}
          </span>
          <span className="text-[10px] text-[#8B6F47]/60 mt-1 block uppercase tracking-widest">
            {task.priority} Priority • {task.xp} XP
          </span>
        </div>

        {/* Origami Crane for Completed State */}
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bottom-2 right-2 text-2xl"
            >
              🦢
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-[#8B6F47]/30" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-[#8B6F47]/30" />
    </motion.div>
  );
}
