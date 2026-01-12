import { motion } from "framer-motion";
import { Timer as TimerIcon, Play, Pause, RotateCcw } from "lucide-react";
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
    <div className="min-h-screen bg-[#4A4A4A] p-4 md:p-8 flex items-center justify-center font-pixel">
      <motion.div 
        className="w-full max-w-5xl h-[85vh] bg-[#FFF8F0] relative flex flex-col shadow-[10px_10px_0_0_#222] border-4 border-[#8B6F47] overflow-hidden rounded-sm"
      >
        <div className="h-12 bg-[#B4FFE6] border-b-4 border-[#8B6F47] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TimerIcon className="text-[#8B6F47]" />
            <span className="font-display text-[#8B6F47] text-sm md:text-base pt-1">
              Mochi Moon Café - Timer
            </span>
          </div>
          <Link href="/break">
            <button className="w-6 h-6 bg-[#FFC4DD] border-2 border-[#8B6F47] hover:bg-red-400 flex items-center justify-center">
              <span className="text-[#8B6F47] text-xs">x</span>
            </button>
          </Link>
        </div>

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
      </motion.div>
    </div>
  );
}