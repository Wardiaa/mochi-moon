import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Moon, Sun, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

interface MochiSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPosition: () => void;
  onToggleSleep: () => void;
  isSleeping: boolean;
}

export function MochiSettings({ 
  isOpen, 
  onClose, 
  onResetPosition, 
  onToggleSleep,
  isSleeping 
}: MochiSettingsProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#4A4A4A]/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#FFF8F0] border-4 border-[#8B6F47] w-full max-w-md 
                       shadow-[12px_12px_0_0_#222] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-[#FFC4DD] 
                         border-2 border-[#8B6F47] flex items-center justify-center 
                         text-[#8B6F47] hover:bg-white transition-colors"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-display text-[#8B6F47] mb-6 flex items-center gap-2">
              <Heart className="text-[#FFC4DD]" /> Mochi Settings
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white border-2 border-[#8B6F47]">
                <div className="flex items-center gap-3">
                  {isSleeping ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="font-pixel text-sm text-[#8B6F47]">
                    {isSleeping ? "Sleep Mode" : "Awake"}
                  </span>
                </div>
                <button
                  onClick={onToggleSleep}
                  className={[
                    "w-12 h-6 rounded-full border-2 border-[#8B6F47] relative transition-colors",
                    isSleeping ? "bg-[#D7C4FF]" : "bg-[#FFF4B4]"
                  ].filter(Boolean).join(' ')}
                >
                  <motion.div
                    className="w-4 h-4 bg-white border border-[#8B6F47] rounded-full absolute top-0.5"
                    animate={{ left: isSleeping ? 6 : 26 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white border-2 border-[#8B6F47] opacity-50">
                <div className="flex items-center gap-3">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  <span className="font-pixel text-sm text-[#8B6F47]">
                    Sounds (Coming Soon)
                  </span>
                </div>
                <button
                  disabled
                  className="w-12 h-6 rounded-full border-2 border-[#8B6F47] bg-gray-200"
                >
                  <div className="w-4 h-4 bg-white border border-[#8B6F47] rounded-full ml-6" />
                </button>
              </div>

              <button
                onClick={onResetPosition}
                className="w-full p-4 bg-[#B4FFE6] border-2 border-[#8B6F47] 
                           shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] 
                           font-pixel text-sm flex items-center justify-center gap-2
                           active:translate-y-1 active:shadow-none transition-all"
              >
                <Sparkles size={16} /> Reset Mochi Position
              </button>

              <div className="mt-6 p-4 bg-[#FFF4B4] border-2 border-[#8B6F47]">
                <p className="text-xs text-[#8B6F47] font-pixel leading-relaxed">
                  Mochi is a pixelated cat who loves when you complete tasks! 
                  The more quests you finish, the happier Mochi gets! 
                  Click on Mochi to pet them!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
