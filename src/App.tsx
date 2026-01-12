import { TooltipProvider } from "./components/ui/tooltip";
import { TaskProvider } from "./lib/task-context";
import { SimpleToastProvider } from "./components/SimpleToast";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import BreakTime from "./pages/BreakTime";
import Recipes from "./pages/Recipes";
import RecipeEditor from "./pages/RecipeEditor";
import Timer from "./pages/timer";
import NotFound from "./pages/not-found";

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
            <Route path="/recipes/edit" component={RecipeEditor} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </SimpleToastProvider>
    </TaskProvider>
  );
}

export default App;