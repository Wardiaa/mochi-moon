import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTasks } from "../lib/task-context";

type Mood = 'happy' | 'sleepy' | 'excited' | 'idle' | 'eating';

interface MochiPetProps {
  className?: string;
}

function PixelCat({ mood, isSleeping, isPetting, happiness }: { mood: Mood; isSleeping: boolean; isPetting: boolean; happiness: number }) {
  const bodyColor = isSleeping ? '#D7C4FF' :
    happiness > 80 ? '#FFC4DD' :
    happiness > 50 ? '#FFF4B4' :
    '#B4FFE6';

  const earColor = isSleeping ? '#C4B0F0' :
    happiness > 80 ? '#FFB0CC' :
    happiness > 50 ? '#FFE88A' :
    '#8AE6C8';

  const cheekColor = '#FFC4DD';
  const outlineColor = '#5C4033';
  const eyeColor = '#5C4033';
  const noseColor = '#FF8FAB';
  const mouthColor = '#5C4033';
  const bellyColor = '#FFFFFF';
  const pawColor = '#FFFFFF';
  const tailColor = earColor;

  return (
    <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      {/* Left Ear */}
      <rect x="5" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="4" width="2" height="2" fill={earColor} />
      <rect x="9" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="6" width="2" height="2" fill={bodyColor} />

      {/* Right Ear */}
      <rect x="23" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="25" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="4" width="2" height="2" fill={earColor} />
      <rect x="25" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="6" width="2" height="2" fill={bodyColor} />
      <rect x="23" y="6" width="2" height="2" fill={outlineColor} />

      {/* Head top outline */}
      <rect x="9" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="11" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="13" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="15" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="17" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="19" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="4" width="2" height="2" fill={outlineColor} />

      {/* Head fill */}
      <rect x="9" y="6" width="14" height="2" fill={bodyColor} />
      <rect x="7" y="8" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="10" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="12" width="18" height="2" fill={bodyColor} />
      <rect x="9" y="14" width="14" height="2" fill={bodyColor} />

      {/* Head side outlines */}
      <rect x="7" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="8" width="2" height="4" fill={outlineColor} />
      <rect x="25" y="8" width="2" height="4" fill={outlineColor} />
      <rect x="7" y="12" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="12" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="14" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="14" width="2" height="2" fill={outlineColor} />

      {/* Eyes */}
      {isSleeping ? (
        <>
          <rect x="10" y="9" width="4" height="2" fill={eyeColor} />
          <rect x="18" y="9" width="4" height="2" fill={eyeColor} />
        </>
      ) : mood === 'excited' ? (
        <>
          <rect x="11" y="8" width="2" height="2" fill={eyeColor} />
          <rect x="10" y="10" width="4" height="2" fill={eyeColor} />
          <rect x="19" y="8" width="2" height="2" fill={eyeColor} />
          <rect x="18" y="10" width="4" height="2" fill={eyeColor} />
        </>
      ) : (
        <>
          <rect x="11" y="8" width="2" height="4" fill={eyeColor} />
          <rect x="11" y="8" width="2" height="2" fill="#FFFFFF" opacity="0.5" />
          <rect x="19" y="8" width="2" height="4" fill={eyeColor} />
          <rect x="19" y="8" width="2" height="2" fill="#FFFFFF" opacity="0.5" />
        </>
      )}

      {/* Nose */}
      <rect x="15" y="11" width="2" height="2" fill={noseColor} />

      {/* Mouth */}
      {mood === 'happy' || isPetting ? (
        <>
          <rect x="13" y="13" width="2" height="1" fill={mouthColor} />
          <rect x="15" y="14" width="2" height="1" fill={mouthColor} />
          <rect x="17" y="13" width="2" height="1" fill={mouthColor} />
        </>
      ) : (
        <>
          <rect x="14" y="13" width="4" height="1" fill={mouthColor} />
        </>
      )}

      {/* Cheeks / blush */}
      {(mood === 'happy' || isPetting) && (
        <>
          <rect x="8" y="11" width="2" height="2" fill={cheekColor} opacity="0.6" />
          <rect x="22" y="11" width="2" height="2" fill={cheekColor} opacity="0.6" />
        </>
      )}

      {/* Whiskers */}
      <rect x="4" y="10" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="4" y="12" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="24" y="10" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="24" y="12" width="4" height="1" fill={outlineColor} opacity="0.4" />

      {/* Body */}
      <rect x="9" y="16" width="14" height="2" fill={bodyColor} />
      <rect x="7" y="18" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="20" width="18" height="2" fill={bodyColor} />
      <rect x="9" y="22" width="14" height="2" fill={bodyColor} />

      {/* Body outlines */}
      <rect x="9" y="16" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="16" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="18" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="18" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="20" width="2" height="2" fill={outlineColor} />
      <rect x="25" y="20" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="22" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="22" width="2" height="2" fill={outlineColor} />

      {/* Belly */}
      <rect x="13" y="18" width="6" height="4" fill={bellyColor} opacity="0.6" />

      {/* Paws */}
      <rect x="7" y="24" width="4" height="2" fill={pawColor} />
      <rect x="7" y="24" width="4" height="2" fill={outlineColor} opacity="0.3" />
      <rect x="21" y="24" width="4" height="2" fill={pawColor} />
      <rect x="21" y="24" width="4" height="2" fill={outlineColor} opacity="0.3" />
      <rect x="7" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="26" width="2" height="2" fill={outlineColor} />

      {/* Tail */}
      <rect x="25" y="20" width="2" height="2" fill={tailColor} />
      <rect x="27" y="18" width="2" height="2" fill={tailColor} />
      <rect x="29" y="16" width="2" height="2" fill={tailColor} />
      <rect x="29" y="14" width="2" height="2" fill={tailColor} />
      <rect x="25" y="20" width="2" height="2" fill={outlineColor} opacity="0.2" />
      <rect x="27" y="18" width="2" height="2" fill={outlineColor} opacity="0.2" />
    </svg>
  );
}

export function MochiPet({ className }: MochiPetProps) {
  const [mood, setMood] = useState<Mood>('idle');
  const [happiness, setHappiness] = useState(75);
  const [isSleeping, setIsSleeping] = useState(false);
  const [showThought, setShowThought] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [lastTaskCount, setLastTaskCount] = useState(0);
  const [isPetting, setIsPetting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [tailWag, setTailWag] = useState(false);
  
  const { tasks } = useTasks();
  const mochiRef = useRef<HTMLDivElement>(null);

  const completedToday = tasks?.filter(t => {
    if (!t.completed) return false;
    const taskDate = new Date(t.createdAt).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  }).length || 0;

  useEffect(() => {
    const saved = localStorage.getItem('mochi-position');
    if (saved) {
      try {
        const pos = JSON.parse(saved);
        const safeX = Math.min(Math.max(pos.x, 10), window.innerWidth - 100);
        const safeY = Math.min(Math.max(pos.y, 10), window.innerHeight - 100);
        setPosition({ x: safeX, y: safeY });
      } catch (e) {
        console.log('No saved position');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mochi-position', JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    if (completedToday > lastTaskCount) {
      setHappiness(prev => Math.min(100, prev + 5));
      setMood('excited');
      setShowThought('Yay! Task done!');
      setTailWag(true);
      
      setTimeout(() => setShowThought(null), 2000);
      setTimeout(() => setMood('happy'), 3000);
      setTimeout(() => setTailWag(false), 4000);
      
      setLastTaskCount(completedToday);
    }
  }, [completedToday, lastTaskCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness(prev => Math.max(20, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 23 || hour < 6) {
      setIsSleeping(true);
      setMood('sleepy');
    } else {
      setIsSleeping(false);
      if (happiness > 80) setMood('happy');
      else if (happiness > 50) setMood('idle');
      else setMood('sleepy');
    }
  }, [happiness]);

  useEffect(() => {
    if (isSleeping || isDragging) return;

    const thoughts = [
      'Meow~',
      'Nya~',
      '*purr*',
      '*stretch*',
      '*yawn*',
      'Pet me!',
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        setShowThought(thought);
        setTimeout(() => setShowThought(null), 1500);

        if (Math.random() > 0.5) {
          setTailWag(true);
          setTimeout(() => setTailWag(false), 2000);
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isSleeping, isDragging, happiness]);

  const handlePet = () => {
    setIsPetting(true);
    setHappiness(prev => Math.min(100, prev + 2));
    setMood('happy');
    setShowThought('Purrr~');
    setTailWag(true);
    
    setTimeout(() => {
      setIsPetting(false);
      setShowThought(null);
      setTailWag(false);
    }, 1500);
  };

  const resetPosition = () => {
    setPosition({ x: 20, y: 20 });
    setShowThought('Here I am! Meow~');
    setTimeout(() => setShowThought(null), 1500);
  };

  useEffect(() => {
    // @ts-ignore
    window.resetMochi = resetPosition;
  }, []);

  useEffect(() => {
    const checkVisibility = () => {
      if (position.x < -50 || position.x > window.innerWidth + 50 || 
          position.y < -50 || position.y > window.innerHeight + 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    checkVisibility();
  }, [position]);

  if (!isVisible) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={resetPosition}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 999999,
          backgroundColor: '#FFC4DD',
          border: '4px solid #5C4033',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '4px 4px 0px 0px #5C4033',
          fontFamily: 'Silkscreen, monospace',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Find Mochi
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={mochiRef}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: window.innerWidth - 100,
        top: 10,
        bottom: window.innerHeight - 100,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        const newX = Math.min(Math.max(info.point.x, 10), window.innerWidth - 100);
        const newY = Math.min(Math.max(info.point.y, 10), window.innerHeight - 100);
        setPosition({ x: newX, y: newY });
      }}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isPetting ? 1.15 : isSleeping ? 0.95 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 999999,
        cursor: 'grab',
      }}
      onClick={handlePet}
    >
      {/* Thought bubble */}
      <AnimatePresence>
        {showThought && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              border: '2px solid #5C4033',
              padding: '4px 12px',
              borderRadius: '12px',
              color: '#5C4033',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              fontFamily: 'Silkscreen, monospace',
              boxShadow: '2px 2px 0px 0px #5C4033',
            }}
          >
            {showThought}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid white',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mochi body */}
      <div style={{ position: 'relative' }}>
        {/* ZZZ for sleeping */}
        <AnimatePresence>
          {isSleeping && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: -10 }}
              animate={{ opacity: [0.3, 1, 0.3], x: [10, 20, 10], y: [-10, -25, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-15px',
                color: '#5C4033',
                fontSize: '16px',
                fontFamily: 'Silkscreen, monospace',
              }}
            >
              Zzz
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main pixel cat */}
        <motion.div
          animate={{
            y: isSleeping ? [0, -2, 0] : [0, -5, 0],
            rotate: tailWag ? [0, 2, -2, 0] : 0,
          }}
          transition={{ 
            y: { duration: isSleeping ? 3 : 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.3, repeat: tailWag ? Infinity : 0, ease: "easeInOut" },
          }}
          style={{
            filter: isPetting ? 'brightness(1.1)' : 'none',
          }}
        >
          <PixelCat 
            mood={mood} 
            isSleeping={isSleeping} 
            isPetting={isPetting} 
            happiness={happiness} 
          />
        </motion.div>

        {/* Happiness bar */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '5px',
          right: '5px',
          height: '6px',
          backgroundColor: 'white',
          border: '2px solid #5C4033',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <motion.div 
            style={{
              height: '100%',
              backgroundColor: happiness > 60 ? '#B4FFE6' : happiness > 30 ? '#FFF4B4' : '#FFC4DD',
              borderRadius: '1px',
            }}
            animate={{ width: `${happiness}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>

        {/* Sparkles when petting */}
        <AnimatePresence>
          {isPetting && (
            <>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 40, y: 40 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    x: 40 + Math.cos(i * 2.1) * 30,
                    y: 20 + Math.sin(i * 2.1) * 25,
                  }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  style={{
                    position: 'absolute',
                    fontSize: '14px',
                    pointerEvents: 'none',
                  }}
                >
                  {['*', '+', '*'][i]}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
