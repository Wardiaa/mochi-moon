import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, Trash2, Gamepad2 } from "lucide-react";
import { Home as HomeIcon, Coffee, Cherry } from "lucide-react";

import { useState } from "react";
import { navigateTo } from "../utils/navigation";

export default function RecipeEditor() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };
  const updateIngredient = (index: number, val: string) => {
    const next = [...ingredients];
    next[index] = val;
    setIngredients(next);
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };
  const updateInstruction = (index: number, val: string) => {
    const next = [...instructions];
    next[index] = val;
    setInstructions(next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save recipe to localStorage
    const recipe = {
      name,
      description,
      ingredients: ingredients.filter(ing => ing.trim() !== ""),
      instructions: instructions.filter(inst => inst.trim() !== ""),
      difficulty: "Medium", // Default value
      time: "30 mins" // Default value
    };
    
    // Get existing recipes from localStorage
    const existingRecipes = JSON.parse(localStorage.getItem('mochi-recipes') || '[]');
    
    // Add new recipe
    existingRecipes.push(recipe);
    
    // Save back to localStorage
    localStorage.setItem('mochi-recipes', JSON.stringify(existingRecipes));
    
    // Navigate back to recipes page
    navigateTo("/recipes");
  };

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
              Mochi Moon Café - Secret Recipe Editor
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
              tooltip="Break Time" 
              href="/break"
            />
            <NavButton 
              icon={<Cherry size={24} />} 
              active 
              tooltip="Recipes" 
              href="/recipes"
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
            <button 
              onClick={() => navigateTo("/recipes")}
              className="flex items-center gap-2 text-[#8B6F47] mb-8 hover:translate-x-[-4px] transition-transform uppercase text-xs font-bold"
            >
              <ArrowLeft size={16} /> Back to Book
            </button>

            <form onSubmit={handleSave} className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-4">
                <label className="block text-[#8B6F47] font-display text-xl uppercase">Recipe Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dreamy Matcha Roll"
                  className="w-full h-14 px-4 bg-white border-4 border-[#8B6F47] text-[#8B6F47] focus:outline-none focus:bg-[#FFF4B4] transition-colors"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[#8B6F47] font-display text-xl uppercase">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A little story about this treat..."
                  className="w-full h-32 p-4 bg-white border-4 border-[#8B6F47] text-[#8B6F47] focus:outline-none focus:bg-[#FFF4B4] transition-colors resize-none font-pixel"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[#8B6F47] font-display text-xl uppercase">Ingredients</label>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="w-10 h-10 bg-[#B4FFE6] border-2 border-[#8B6F47] shadow-[2px_2px_0_0_#8B6F47] flex items-center justify-center text-[#8B6F47] active:translate-y-0.5 active:shadow-none"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {ingredients.map((ing, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        value={ing}
                        onChange={(e) => updateIngredient(i, e.target.value)}
                        placeholder={`Ingredient #${i + 1}`}
                        className="flex-1 h-12 px-4 bg-white border-2 border-[#8B6F47] text-[#8B6F47] focus:outline-none focus:bg-[#FFF4B4]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeIngredient(i)}
                        className="w-12 h-12 bg-[#FFC4DD] border-2 border-[#8B6F47] flex items-center justify-center text-[#8B6F47] disabled:opacity-50"
                        disabled={ingredients.length <= 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[#8B6F47] font-display text-xl uppercase">Instructions</label>
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="w-10 h-10 bg-[#D7C4FF] border-2 border-[#8B6F47] shadow-[2px_2px_0_0_#8B6F47] flex items-center justify-center text-[#8B6F47] active:translate-y-0.5 active:shadow-none"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {instructions.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <textarea
                        value={step}
                        onChange={(e) => updateInstruction(i, e.target.value)}
                        placeholder={`Step ${i + 1}...`}
                        className="flex-1 min-h-[80px] p-3 bg-white border-2 border-[#8B6F47] text-[#8B6F47] focus:outline-none focus:bg-[#FFF4B4] resize-none font-pixel"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeInstruction(i)}
                        className="w-12 h-12 bg-[#FFC4DD] border-2 border-[#8B6F47] flex items-center justify-center text-[#8B6F47] disabled:opacity-50"
                        disabled={instructions.length <= 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-[#D7C4FF] border-4 border-[#8B6F47] shadow-[6px_6px_0_0_#8B6F47] text-[#8B6F47] font-display text-xl flex items-center justify-center gap-3 uppercase"
                >
                  <Save /> Save Secret Recipe
                </motion.button>
              </div>
            </form>
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
    <motion.button
      onClick={() => navigateTo(href)}
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
  );
}