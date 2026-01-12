import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { waitForFonts, ensureFontsLoaded } from "./utils/fonts";

// Wait for fonts to load before rendering
waitForFonts().then(() => {
  // Force fonts to load by rendering them
  ensureFontsLoaded();
  
  // Render the app
  createRoot(document.getElementById("root")!).render(<App />);
});