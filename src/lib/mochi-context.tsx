import React, { createContext, useContext, useState, useEffect } from 'react';

interface MochiContextType {
  happiness: number;
  position: { x: number; y: number };
  isSleeping: boolean;
  updateHappiness: (value: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
  toggleSleep: () => void;
  resetPosition: () => void;
}

const MochiContext = createContext<MochiContextType | undefined>(undefined);

const STORAGE_KEY = 'mochi-moon-mochi-state';

export function MochiProvider({ children }: { children: React.ReactNode }) {
  // Load saved state from localStorage
  const [happiness, setHappiness] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.happiness || 75;
    }
    return 75;
  });

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.position || { x: 20, y: 20 };
    }
    return { x: 20, y: 20 };
  });

  const [isSleeping, setIsSleeping] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.isSleeping || false;
    }
    return false;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      happiness,
      position,
      isSleeping
    }));
  }, [happiness, position, isSleeping]);

  const updateHappiness = (value: number) => {
    setHappiness((prev: number) => Math.min(100, Math.max(0, prev + value)));
  };

  const toggleSleep = () => {
    setIsSleeping((prev: any) => !prev);
  };

  const resetPosition = () => {
    setPosition({ x: 20, y: 20 });
  };

  return (
    <MochiContext.Provider value={{
      happiness,
      position,
      isSleeping,
      updateHappiness,
      setPosition,
      toggleSleep,
      resetPosition
    }}>
      {children}
    </MochiContext.Provider>
  );
}

export function useMochi() {
  const context = useContext(MochiContext);
  if (context === undefined) {
    throw new Error('useMochi must be used within a MochiProvider');
  }
  return context;
}