import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper for Mochi happiness
export function getMoodFromHappiness(happiness: number): string {
  if (happiness > 80) return 'excited';
  if (happiness > 60) return 'happy';
  if (happiness > 40) return 'idle';
  if (happiness > 20) return 'sleepy';
  return 'sad';
}

// Format time for timer
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Generate random position within bounds
export function getRandomPosition(bounds: { width: number; height: number }) {
  return {
    x: Math.random() * (bounds.width - 100),
    y: Math.random() * (bounds.height - 100)
  };
}