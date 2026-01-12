import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface StrawberryCheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function StrawberryCheckbox({ checked, onChange, className }: StrawberryCheckboxProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        "w-8 h-8 flex items-center justify-center relative focus:outline-none",
        className
      )}
    >
      {/* Pixel Art Strawberry Logic using SVG for crispness at small sizes */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("transition-all duration-300", checked ? "opacity-100" : "opacity-40 grayscale")}
      >
        {/* Stem */}
        <path d="M7 1H9V3H7V1Z" fill="#8B6F47" />
        <path d="M5 2H7V4H5V2Z" fill="#4ADE80" />
        <path d="M9 2H11V4H9V2Z" fill="#4ADE80" />
        
        {/* Body */}
        <path d="M4 4H12V13H4V4Z" fill={checked ? "#FFC4DD" : "transparent"} stroke="#8B6F47" strokeWidth="2" />
        <path d="M5 13H11V14H5V13Z" fill="#8B6F47" />
        
        {/* Seeds (Dots) */}
        {checked && (
          <>
            <rect x="6" y="6" width="1" height="1" fill="#8B6F47" />
            <rect x="9" y="6" width="1" height="1" fill="#8B6F47" />
            <rect x="5" y="9" width="1" height="1" fill="#8B6F47" />
            <rect x="8" y="9" width="1" height="1" fill="#8B6F47" />
            <rect x="10" y="9" width="1" height="1" fill="#8B6F47" />
            <rect x="7" y="11" width="1" height="1" fill="#8B6F47" />
          </>
        )}
      </svg>
      
      {!checked && (
        <div className="absolute inset-0 border-2 border-[#8B6F47] border-dashed opacity-30 rounded-sm" />
      )}
    </motion.button>
  );
}
