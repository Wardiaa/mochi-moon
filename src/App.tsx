import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import { TaskProvider } from "./lib/task-context";

function App() {
  return (
    <TaskProvider>
      <TooltipProvider>
        <Home />
      </TooltipProvider>
    </TaskProvider>
  );
}

export default App;