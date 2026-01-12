import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import { TaskProvider } from "./lib/task-context";
import { SimpleToastProvider } from "./components/SimpleToast";

function App() {
  return (
    <TaskProvider>
      <SimpleToastProvider>
        <TooltipProvider>
          <Home />
        </TooltipProvider>
      </SimpleToastProvider>
    </TaskProvider>
  );
}

export default App;