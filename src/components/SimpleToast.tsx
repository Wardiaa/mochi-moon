import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: number;
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  toasts: Toast[];
  toast: (props: Omit<Toast, 'id'>) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function SimpleToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed top-4 right-4 z-[100000] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 border-2 shadow-[4px_4px_0_0_#8B6F47] max-w-sm relative animate-in slide-in-from-right ${
              t.variant === 'destructive'
                ? 'bg-[#FFC4DD] border-[#8B6F47] text-[#5C4033]'
                : 'bg-[#B4FFE6] border-[#8B6F47] text-[#5C4033]'
            }`}
            style={{ fontFamily: 'Silkscreen, monospace' }}
          >
            <div className="font-bold text-sm">{t.title}</div>
            <div className="text-xs mt-1 opacity-80">{t.description}</div>
            <button
              onClick={() => dismiss(t.id)}
              className="absolute top-1 right-2 text-[#8B6F47] hover:text-[#5C4033] text-lg leading-none"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useSimpleToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useSimpleToast must be used within SimpleToastProvider');
  }
  return context;
}
