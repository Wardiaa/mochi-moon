import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTasks } from "../lib/task-context";
import { useMochi } from "../lib/mochi-context";

type Mood = 'happy' | 'sleepy' | 'excited' | 'idle' | 'eating';

interface MochiPetProps {
  className?: string;
}

// ── Awake pixel cat (original design) ───────────────────────────────────────
function PixelCat({ mood, isPetting, happiness }: { mood: Mood; isPetting: boolean; happiness: number }) {
  const bodyColor =
    happiness > 80 ? '#FFC4DD' :
    happiness > 50 ? '#FFF4B4' :
    '#B4FFE6';
  const earColor =
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
      <rect x="5" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="4" width="2" height="2" fill={earColor} />
      <rect x="9" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="6" width="2" height="2" fill={bodyColor} />
      <rect x="23" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="25" y="2" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="4" width="2" height="2" fill={earColor} />
      <rect x="25" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="6" width="2" height="2" fill={bodyColor} />
      <rect x="23" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="11" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="13" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="15" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="17" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="19" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="4" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="6" width="14" height="2" fill={bodyColor} />
      <rect x="7" y="8" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="10" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="12" width="18" height="2" fill={bodyColor} />
      <rect x="9" y="14" width="14" height="2" fill={bodyColor} />
      <rect x="7" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="6" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="8" width="2" height="4" fill={outlineColor} />
      <rect x="25" y="8" width="2" height="4" fill={outlineColor} />
      <rect x="7" y="12" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="12" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="14" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="14" width="2" height="2" fill={outlineColor} />
      {mood === 'excited' ? (
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
      <rect x="15" y="11" width="2" height="2" fill={noseColor} />
      {mood === 'happy' || isPetting ? (
        <>
          <rect x="13" y="13" width="2" height="1" fill={mouthColor} />
          <rect x="15" y="14" width="2" height="1" fill={mouthColor} />
          <rect x="17" y="13" width="2" height="1" fill={mouthColor} />
        </>
      ) : (
        <rect x="14" y="13" width="4" height="1" fill={mouthColor} />
      )}
      {(mood === 'happy' || isPetting) && (
        <>
          <rect x="8" y="11" width="2" height="2" fill={cheekColor} opacity="0.6" />
          <rect x="22" y="11" width="2" height="2" fill={cheekColor} opacity="0.6" />
        </>
      )}
      <rect x="4" y="10" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="4" y="12" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="24" y="10" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="24" y="12" width="4" height="1" fill={outlineColor} opacity="0.4" />
      <rect x="9" y="16" width="14" height="2" fill={bodyColor} />
      <rect x="7" y="18" width="18" height="2" fill={bodyColor} />
      <rect x="7" y="20" width="18" height="2" fill={bodyColor} />
      <rect x="9" y="22" width="14" height="2" fill={bodyColor} />
      <rect x="9" y="16" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="16" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="18" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="18" width="2" height="2" fill={outlineColor} />
      <rect x="5" y="20" width="2" height="2" fill={outlineColor} />
      <rect x="25" y="20" width="2" height="2" fill={outlineColor} />
      <rect x="7" y="22" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="22" width="2" height="2" fill={outlineColor} />
      <rect x="13" y="18" width="6" height="4" fill={bellyColor} opacity="0.6" />
      <rect x="7" y="24" width="4" height="2" fill={pawColor} />
      <rect x="7" y="24" width="4" height="2" fill={outlineColor} opacity="0.3" />
      <rect x="21" y="24" width="4" height="2" fill={pawColor} />
      <rect x="21" y="24" width="4" height="2" fill={outlineColor} opacity="0.3" />
      <rect x="7" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="9" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="21" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="23" y="26" width="2" height="2" fill={outlineColor} />
      <rect x="25" y="20" width="2" height="2" fill={tailColor} />
      <rect x="27" y="18" width="2" height="2" fill={tailColor} />
      <rect x="29" y="16" width="2" height="2" fill={tailColor} />
      <rect x="29" y="14" width="2" height="2" fill={tailColor} />
      <rect x="25" y="20" width="2" height="2" fill={outlineColor} opacity="0.2" />
      <rect x="27" y="18" width="2" height="2" fill={outlineColor} opacity="0.2" />
    </svg>
  );
}

// ── Sleeping pixel cat (lying down, always blue/purple) ──────────────────────
function SleepingPixelCat() {
  const bodyColor  = '#D7C4FF';
  const earColor   = '#C4B0F0';
  const belly      = '#FFFFFF';
  const outline    = '#5C4033';
  const nose       = '#FF8FAB';
  const cheek      = '#FFC4DD';

  return (
    // 96×56 render, viewBox 48×28 — cat lying on its side, head left, tail curling right
    <svg width="96" height="56" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>

      {/* ── Floppy left ear ── */}
      <rect x="1"  y="5" width="2" height="3" fill={earColor} />
      <rect x="3"  y="4" width="2" height="3" fill={earColor} />
      <rect x="1"  y="3" width="2" height="2" fill={outline} />
      <rect x="3"  y="2" width="2" height="2" fill={outline} />
      <rect x="5"  y="4" width="2" height="2" fill={outline} />
      <rect x="1"  y="8" width="4" height="1" fill={outline} />

      {/* ── Floppy right ear ── */}
      <rect x="7"  y="4" width="2" height="3" fill={earColor} />
      <rect x="9"  y="5" width="2" height="3" fill={earColor} />
      <rect x="7"  y="2" width="2" height="2" fill={outline} />
      <rect x="9"  y="3" width="2" height="2" fill={outline} />
      <rect x="11" y="4" width="2" height="2" fill={outline} />
      <rect x="7"  y="8" width="4" height="1" fill={outline} />

      {/* ── Head ── */}
      <rect x="0"  y="8"  width="14" height="14" fill={bodyColor} />
      {/* head outline */}
      <rect x="0"  y="6"  width="14" height="2"  fill={outline} />
      <rect x="0"  y="22" width="14" height="2"  fill={outline} />
      <rect x="14" y="8"  width="1"  height="14" fill={outline} />

      {/* closed eyes  ─── (two horizontal bars = shut) */}
      <rect x="2"  y="12" width="4"  height="2"  fill={outline} />
      <rect x="8"  y="12" width="4"  height="2"  fill={outline} />
      {/* tiny curve under each eye */}
      <rect x="3"  y="14" width="2"  height="1"  fill={outline} opacity="0.5" />
      <rect x="9"  y="14" width="2"  height="1"  fill={outline} opacity="0.5" />

      {/* nose */}
      <rect x="6"  y="17" width="2"  height="2"  fill={nose} />

      {/* relaxed mouth */}
      <rect x="4"  y="19" width="6"  height="1"  fill={outline} opacity="0.5" />

      {/* rosy cheeks */}
      <rect x="1"  y="16" width="2"  height="2"  fill={cheek} opacity="0.45" />
      <rect x="11" y="16" width="2"  height="2"  fill={cheek} opacity="0.45" />

      {/* whiskers */}
      <rect x="0"  y="18" width="2"  height="1"  fill={outline} opacity="0.25" />
      <rect x="0"  y="20" width="2"  height="1"  fill={outline} opacity="0.25" />

      {/* ── Body (horizontal, going right from head) ── */}
      <rect x="14" y="8"  width="24" height="16" fill={bodyColor} />
      {/* body outline */}
      <rect x="14" y="6"  width="24" height="2"  fill={outline} />
      <rect x="14" y="24" width="24" height="2"  fill={outline} />
      <rect x="38" y="8"  width="2"  height="16" fill={outline} />

      {/* belly patch */}
      <rect x="19" y="12" width="12" height="6"  fill={belly} opacity="0.45" />

      {/* ── Front paws (tucked out below head) ── */}
      <rect x="1"  y="24" width="10" height="3"  fill={bodyColor} />
      <rect x="0"  y="24" width="1"  height="3"  fill={outline} />
      <rect x="11" y="24" width="1"  height="3"  fill={outline} />
      <rect x="1"  y="27" width="4"  height="1"  fill={outline} />
      <rect x="7"  y="27" width="4"  height="1"  fill={outline} />

      {/* ── Back paws ── */}
      <rect x="29" y="24" width="8"  height="3"  fill={bodyColor} />
      <rect x="28" y="24" width="1"  height="3"  fill={outline} />
      <rect x="37" y="24" width="1"  height="3"  fill={outline} />
      <rect x="29" y="27" width="4"  height="1"  fill={outline} />
      <rect x="33" y="27" width="4"  height="1"  fill={outline} />

      {/* ── Tail (curling upward from right end of body) ── */}
      <rect x="38" y="4"  width="4"  height="4"  fill={earColor} />
      <rect x="40" y="2"  width="4"  height="4"  fill={earColor} />
      <rect x="42" y="0"  width="4"  height="3"  fill={earColor} />
      <rect x="44" y="2"  width="2"  height="2"  fill={earColor} />
      {/* tail outline */}
      <rect x="36" y="4"  width="2"  height="4"  fill={outline} />
      <rect x="36" y="8"  width="2"  height="2"  fill={outline} />
      <rect x="38" y="2"  width="2"  height="2"  fill={outline} />
      <rect x="40" y="0"  width="2"  height="2"  fill={outline} />
      <rect x="42" y="0"  width="2"  height="1"  fill={outline} />
      <rect x="44" y="0"  width="2"  height="2"  fill={outline} />
      <rect x="46" y="2"  width="2"  height="2"  fill={outline} />
      <rect x="44" y="4"  width="2"  height="2"  fill={outline} />
      <rect x="42" y="4"  width="2"  height="2"  fill={outline} />
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function MochiPet({ }: MochiPetProps) {
  const { isSleeping, position, setPosition, happiness, updateHappiness } = useMochi();

  const [mood, setMood] = useState<Mood>('idle');
  const [showThought, setShowThought] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastTaskCount, setLastTaskCount] = useState(0);
  const [isPetting, setIsPetting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [tailWag, setTailWag] = useState(false);

  const mochiRef = useRef<HTMLDivElement>(null);
  const { tasks } = useTasks();

  const completedToday = tasks?.filter(t => {
    if (!t.completed) return false;
    return new Date(t.createdAt).toDateString() === new Date().toDateString();
  }).length || 0;

  // When sleeping → snap to bottom-left and lock
  useEffect(() => {
    if (isSleeping) {
      setPosition({ x: 10, y: window.innerHeight - 110 });
    }
  }, [isSleeping]);

  // Completed tasks → happiness + excitement
  useEffect(() => {
    if (completedToday > lastTaskCount) {
      updateHappiness(5);
      setMood('excited');
      setShowThought('Yay! Task done!');
      setTailWag(true);
      setTimeout(() => setShowThought(null), 2000);
      setTimeout(() => setMood('happy'), 3000);
      setTimeout(() => setTailWag(false), 4000);
      setLastTaskCount(completedToday);
    }
  }, [completedToday, lastTaskCount]);

  // Slow happiness decay
  useEffect(() => {
    const interval = setInterval(() => updateHappiness(-1), 60000);
    return () => clearInterval(interval);
  }, []);

  // Mood from happiness
  useEffect(() => {
    if (isSleeping) { setMood('sleepy'); return; }
    if (happiness > 80) setMood('happy');
    else if (happiness > 50) setMood('idle');
    else setMood('sleepy');
  }, [happiness, isSleeping]);

  // Random thoughts when awake
  useEffect(() => {
    if (isSleeping || isDragging) return;
    const thoughts = ['Meow~', 'Nya~', '*purr*', '*stretch*', '*yawn*', 'Pet me!'];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const t = thoughts[Math.floor(Math.random() * thoughts.length)];
        setShowThought(t);
        setTimeout(() => setShowThought(null), 1500);
        if (Math.random() > 0.5) { setTailWag(true); setTimeout(() => setTailWag(false), 2000); }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isSleeping, isDragging]);

  // Thought bubble when sleep state flips
  const prevSleepRef = useRef(isSleeping);
  useEffect(() => {
    if (prevSleepRef.current === isSleeping) return;
    prevSleepRef.current = isSleeping;
    setShowThought(isSleeping ? 'Zzz...' : 'Good morning! ☀️');
    setTimeout(() => setShowThought(null), 2000);
  }, [isSleeping]);

  // Thought bubble when position resets to home (20,20)
  const prevPosRef = useRef(position);
  useEffect(() => {
    const wasReset = prevPosRef.current.x !== position.x && position.x === 20 && position.y === 20;
    prevPosRef.current = position;
    if (wasReset) { setShowThought('Here I am! Meow~'); setTimeout(() => setShowThought(null), 2000); }
  }, [position]);

  // Visibility check (if dragged off-screen)
  useEffect(() => {
    const off = position.x < -50 || position.x > window.innerWidth + 50 ||
                position.y < -50 || position.y > window.innerHeight + 50;
    setIsVisible(!off);
  }, [position]);

  const handlePet = () => {
    if (isSleeping) return;
    setIsPetting(true);
    updateHappiness(2);
    setMood('happy');
    setShowThought('Purrr~');
    setTailWag(true);
    setTimeout(() => { setIsPetting(false); setShowThought(null); setTailWag(false); }, 1500);
  };

  if (!isVisible) {
    return (
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setPosition({ x: 10, y: window.innerHeight - 110 })}
        style={{
          position: 'fixed', bottom: 20, left: 20, zIndex: 999999,
          backgroundColor: '#FFC4DD', border: '4px solid #5C4033',
          borderRadius: '50%', width: 60, height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, cursor: 'pointer', color: '#5C4033',
          boxShadow: '4px 4px 0px 0px #5C4033',
          fontFamily: 'Silkscreen, monospace',
        }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      >
        Find Mochi
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={mochiRef}
      drag={!isSleeping}
      dragMomentum={false}
      dragConstraints={{
        left: 10, right: window.innerWidth - 100,
        top: 10,  bottom: window.innerHeight - 100,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        setPosition({
          x: Math.min(Math.max(info.point.x, 10), window.innerWidth - 100),
          y: Math.min(Math.max(info.point.y, 10), window.innerHeight - 100),
        });
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isPetting ? 1.15 : isSleeping ? 0.95 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={!isSleeping ? { scale: 1.05 } : {}}
      whileTap={!isSleeping ? { scale: 0.95 } : {}}
      style={{ position: 'fixed', left: 0, top: 0, zIndex: 999999, cursor: isSleeping ? 'default' : 'grab' }}
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
              bottom: isSleeping ? '70px' : '90px',
              left: '50%', transform: 'translateX(-50%)',
              backgroundColor: 'white', border: '2px solid #5C4033',
              padding: '4px 12px', borderRadius: '12px',
              color: '#5C4033', fontSize: 13, whiteSpace: 'nowrap',
              fontFamily: 'Silkscreen, monospace',
              boxShadow: '2px 2px 0px 0px #5C4033',
            }}
          >
            {showThought}
            <div style={{
              position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: '8px solid white',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        {/* ZZZ bubbles when sleeping */}
        <AnimatePresence>
          {isSleeping && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: -10 }}
              animate={{ opacity: [0.3, 1, 0.3], x: [10, 22, 10], y: [-10, -28, -10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: 'absolute', top: -12, right: -18,
                color: '#5C4033', fontSize: 18,
                fontFamily: 'Silkscreen, monospace',
              }}
            >
              Zzz
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cat body — swap to sleeping variant */}
        <motion.div
          animate={
            isSleeping
              ? { y: [0, -2, 0] }
              : tailWag
              ? { y: [0, -5, 0], rotate: [0, 2, -2, 0] }
              : { y: [0, -5, 0] }
          }
          transition={{
            y: { duration: isSleeping ? 3 : 2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0.3, repeat: tailWag ? Infinity : 0, ease: 'easeInOut' },
          }}
          style={{ filter: isPetting ? 'brightness(1.1)' : 'none' }}
        >
          {isSleeping ? (
            <SleepingPixelCat />
          ) : (
            <PixelCat mood={mood} isPetting={isPetting} happiness={happiness} />
          )}
        </motion.div>

        {/* Happiness bar */}
        <div style={{
          position: 'absolute', bottom: -10, left: 5, right: 5,
          height: 6, backgroundColor: 'white',
          border: '2px solid #5C4033', borderRadius: 3, overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%', borderRadius: 1,
              backgroundColor: isSleeping ? '#D7C4FF' : happiness > 60 ? '#B4FFE6' : happiness > 30 ? '#FFF4B4' : '#FFC4DD',
            }}
            animate={{ width: `${happiness}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>

        {/* Petting sparkles */}
        <AnimatePresence>
          {isPetting && [0, 1, 2].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 40, y: 40 }}
              animate={{
                opacity: [0, 1, 0], scale: [0, 1, 0],
                x: 40 + Math.cos(i * 2.1) * 30,
                y: 20 + Math.sin(i * 2.1) * 25,
              }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{ position: 'absolute', fontSize: 14, pointerEvents: 'none' }}
            >
              {['*', '+', '*'][i]}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
