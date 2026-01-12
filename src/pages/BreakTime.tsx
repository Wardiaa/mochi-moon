import { motion } from "framer-motion";
import { Home as HomeIcon, Coffee, Cherry, Gamepad2 } from "lucide-react";

import { Link } from "wouter";

export default function BreakTime() {
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
              Mochi Moon Café - Break Room
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
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              ☕
            </motion.div>
            <h1 className="text-3xl font-display text-[#8B6F47] mb-4">Time for a Cozy Break</h1>
            <p className="text-[#8B6F47]/70 max-w-md mb-8 leading-relaxed">
              You've been working hard! Take a moment to stretch, grab a warm drink, and watch the clouds drift by.
            </p>
            <div className="flex gap-4">
              <Link href="/break/timer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#D7C4FF] border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-bold uppercase"
                >
                  Start a Timer
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-bold uppercase"
                >
                  Back to Work
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