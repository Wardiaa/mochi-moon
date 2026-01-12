import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Gamepad2 } from "lucide-react";
import { Home as HomeIcon, Coffee, Cherry } from "lucide-react";

import { Link } from "wouter";
import { useState, useEffect } from "react";

const TIMER_OPTIONS = [
  { label: "5m", seconds: 300, color: "#B4FFE6" },
  { label: "15m", seconds: 900, color: "#FFF4B4" },
  { label: "30m", seconds: 1800, color: "#D7C4FF" },
  { label: "60m", seconds: 3600, color: "#FFC4DD" },
];

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound or show notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = (seconds: number) => {
    setTimeLeft(seconds);
    setIsActive(true);
  };

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
              Mochi Moon Café - Timer
            </span>
          </div>
          <div className="flex gap-2 non-draggable">
            {/* Minimize button */}
            <button 
              className="w-6 h-6 bg-[#B4FFE6] border-2 border-[#8B6F47] hover:bg-[#FFF4B4] flex items-center justify-center transition-colors"
              onClick={() => (window as any).electronAPI?.minimizeApp?.()}
            >
              <span className="text-[#8B6F47] text-xs mb-2">_</span>
            </button>
            
            {/* Maximize/Restore button */}
            <button 
              className="w-6 h-6 bg-[#D7C4FF] border-2 border-[#8B6F47] hover:bg-white flex items-center justify-center transition-colors"
              onClick={() => (window as any).electronAPI?.maximizeApp?.()}
            >
              <span className="text-[#8B6F47] text-xs">□</span>
            </button>
            
            {/* Close button */}
            <button 
              className="w-6 h-6 bg-[#FFC4DD] border-2 border-[#8B6F47] hover:bg-red-400 flex items-center justify-center transition-colors"
              onClick={() => (window as any).electronAPI?.closeApp?.()}
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
              
              tooltip="Home"
              href="/"
            />
            <NavButton 
              icon={<Coffee size={24} />} 
              active 
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
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
            <motion.div
              animate={isActive ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-8 relative"
            >
              ☕
              {isActive && (
                <motion.div
                  animate={{ y: [-20, -40], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 right-0 text-2xl"
                >
                  💨
                </motion.div>
              )}
            </motion.div>

            <div className="mb-8">
              <h1 className="text-6xl font-display text-[#8B6F47] mb-2">{formatTime(timeLeft)}</h1>
              <p className="text-[#8B6F47]/70 font-pixel uppercase tracking-widest text-xs">Resting in Progress</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {TIMER_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 0 }}
                  onClick={() => handleStart(opt.seconds)}
                  style={{ backgroundColor: opt.color }}
                  className="px-4 py-2 border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-bold font-pixel"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsActive(!isActive)}
                className="w-16 h-16 bg-white border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] flex items-center justify-center text-[#8B6F47] active:translate-y-1 active:shadow-none transition-all"
              >
                {isActive ? <Pause /> : <Play />}
              </button>
              <button
                onClick={() => { setTimeLeft(300); setIsActive(false); }}
                className="w-16 h-16 bg-white border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] flex items-center justify-center text-[#8B6F47] active:translate-y-1 active:shadow-none transition-all"
              >
                <RotateCcw />
              </button>
            </div>

            {/* Back to break room button */}
            <div className="mt-8">
              <Link href="/break">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#B4FFE6] border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-bold uppercase text-sm"
                >
                  Back to Break Room
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  tooltip: string;
  href: string;
}

function NavButton({ icon, active, tooltip, href }: NavButtonProps) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ y: 1 }}
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
      </motion.button>
    </Link>
  );
}