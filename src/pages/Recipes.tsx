import { motion, AnimatePresence } from "framer-motion";
import { Cherry, Sparkles, Utensils, Plus, X, Heart, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

const DEFAULT_RECIPES = [
  { 
    name: "Strawberry Mochi", 
    ingredients: ["Sweet Rice Flour", "Sugar", "Fresh Strawberries"],
    description: "Soft and chewy rice cake filled with sweet red bean paste and a whole fresh strawberry.",
    difficulty: "Medium",
    time: "45 mins"
  },
  { 
    name: "Moon Dew Tea", 
    ingredients: ["Jasmine Buds", "Moonlight Glow", "Clear Spring Water"],
    description: "A calming tea that glows softly in the dark. Harvested only during the full moon.",
    difficulty: "Easy",
    time: "10 mins"
  },
  { 
    name: "Star Cookie", 
    ingredients: ["Butter", "Flour", "Stardust Sugar", "Vanilla"],
    description: "Crunchy star-shaped cookies that sparkle when you take a bite.",
    difficulty: "Medium",
    time: "30 mins"
  },
];

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [recipes, setRecipes] = useState(DEFAULT_RECIPES);

  useEffect(() => {
    // Load saved recipes from localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('mochi-recipes') || '[]');
    
    if (savedRecipes.length > 0) {
      setRecipes([...DEFAULT_RECIPES, ...savedRecipes]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#4A4A4A] p-4 md:p-8 flex items-center justify-center font-pixel">
      <motion.div 
        className="w-full max-w-5xl h-[85vh] bg-[#FFF8F0] relative flex flex-col shadow-[10px_10px_0_0_#222] border-4 border-[#8B6F47] overflow-hidden rounded-sm"
      >
        <div className="h-12 bg-[#B4FFE6] border-b-4 border-[#8B6F47] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Cherry className="text-[#8B6F47]" />
            <span className="font-display text-[#8B6F47] text-sm md:text-base pt-1">
              Mochi Moon Café - Recipe Book
            </span>
          </div>
          <Link href="/">
            <button className="w-6 h-6 bg-[#FFC4DD] border-2 border-[#8B6F47] hover:bg-red-400 flex items-center justify-center">
              <span className="text-[#8B6F47] text-xs">x</span>
            </button>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display text-[#8B6F47] flex items-center gap-3">
              Secret Recipes <Utensils className="text-[#FFC4DD]" />
            </h1>
            <Link href="/recipes/edit">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#B4FFE6] border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-pixel text-xs flex items-center gap-2"
              >
                <Plus size={16} /> New Recipe
              </motion.button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white border-4 border-[#8B6F47] p-6 shadow-[6px_6px_0_0_rgba(139,111,71,0.1)] relative overflow-hidden group hover:shadow-[8px_8px_0_0_rgba(139,111,71,0.2)] transition-all cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">
                  🍪
                </div>
                <h2 className="text-xl font-display text-[#8B6F47] mb-3">{recipe.name}</h2>
                <div className="flex gap-4 mb-3">
                  <span className="text-[10px] bg-[#B4FFE6] px-2 py-0.5 border border-[#8B6F47] text-[#8B6F47] uppercase font-bold">
                    {recipe.difficulty}
                  </span>
                  <span className="text-[10px] bg-[#FFF4B4] px-2 py-0.5 border border-[#8B6F47] text-[#8B6F47] uppercase font-bold flex items-center gap-1">
                    <Clock size={10} /> {recipe.time}
                  </span>
                </div>
                <ul className="space-y-1">
                  {recipe.ingredients.slice(0, 2).map((ing: string, j: number) => (
                    <li key={j} className="text-[#8B6F47]/70 text-sm flex items-center gap-2">
                      <Sparkles size={12} className="text-[#FFF4B4]" /> {ing}
                    </li>
                  ))}
                  {recipe.ingredients.length > 2 && (
                    <li className="text-[#8B6F47]/40 text-xs italic ml-5">
                      + {recipe.ingredients.length - 2} more...
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recipe Detail Modal */}
        <AnimatePresence>
          {selectedRecipe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#4A4A4A]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedRecipe(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#FFF8F0] border-4 border-[#8B6F47] w-full max-w-lg shadow-[12px_12px_0_0_#222] p-8 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#FFC4DD] border-2 border-[#8B6F47] flex items-center justify-center text-[#8B6F47] hover:bg-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-5xl mb-6">🍰</div>
                <h2 className="text-3xl font-display text-[#8B6F47] mb-4">{selectedRecipe.name}</h2>
                
                <div className="flex gap-4 mb-6">
                  <span className="text-xs bg-[#B4FFE6] px-3 py-1 border-2 border-[#8B6F47] text-[#8B6F47] font-bold uppercase">
                    {selectedRecipe.difficulty}
                  </span>
                  <span className="text-xs bg-[#FFF4B4] px-3 py-1 border-2 border-[#8B6F47] text-[#8B6F47] font-bold uppercase flex items-center gap-2">
                    <Clock size={14} /> {selectedRecipe.time}
                  </span>
                </div>

                <p className="text-[#8B6F47] mb-8 leading-relaxed italic border-l-4 border-[#D7C4FF] pl-4">
                  "{selectedRecipe.description}"
                </p>

                <div className="space-y-4">
                  <h3 className="font-display text-[#8B6F47] uppercase text-sm tracking-widest border-b-2 border-[#8B6F47]/10 pb-2">
                    Ingredients List
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedRecipe.ingredients.map((ing: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 border-2 border-[#8B6F47]/20">
                        <Heart size={16} className="text-[#FFC4DD]" />
                        <span className="text-[#8B6F47] font-bold">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-4 border-dashed border-[#8B6F47]/20 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRecipe(null)}
                    className="px-8 py-3 bg-[#D7C4FF] border-2 border-[#8B6F47] shadow-[4px_4px_0_0_#8B6F47] text-[#8B6F47] font-bold uppercase tracking-wider active:translate-y-1 active:shadow-none transition-all"
                  >
                    Close Recipe
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}