import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import BreakTime from "./pages/BreakTime";
import Timer from "./pages/timer";
import Recipes from "./pages/Recipes";
import RecipeEditor from "./pages/RecipeEditor";
import { TaskProvider } from "./lib/task-context";
import { SimpleToastProvider } from "./components/SimpleToast";
import { Route, Switch } from "wouter";

function App() {
  return (
    <TaskProvider>
      <SimpleToastProvider>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/break" component={BreakTime} />
            <Route path="/break/timer" component={Timer} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/recipes/new" component={RecipeEditor} />
            {/* Fallback to Home */}
            <Route component={Home} />
          </Switch>
        </TooltipProvider>
      </SimpleToastProvider>
    </TaskProvider>
  );
}

export default App;