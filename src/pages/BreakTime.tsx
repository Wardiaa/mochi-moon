import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { Link } from "wouter";

export default function BreakTime() {
  return (
    <div className="min-h-screen bg-[#4A4A4A] p-4 md:p-8 flex items-center justify-center font-pixel">
      <motion.div 
        className="w-full max-w-5xl h-[85vh] bg-[#FFF8F0] relative flex flex-col shadow-[10px_10px_0_0_#222] border-4 border-[#8B6F47] overflow-hidden rounded-sm"
      >
        <div className="h-12 bg-[#B4FFE6] border-b-4 border-[#8B6F47] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Coffee className="text-[#8B6F47]" />
            <span className="font-display text-[#8B6F47] text-sm md:text-base pt-1">
              Mochi Moon Café - Break Room
            </span>
          </div>
          <Link href="/">
            <button className="w-6 h-6 bg-[#FFC4DD] border-2 border-[#8B6F47] hover:bg-red-400 flex items-center justify-center">
              <span className="text-[#8B6F47] text-xs">x</span>
            </button>
          </Link>
        </div>

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
      </motion.div>
    </div>
  );
}