import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/fari-home";
import NotFound from "@/pages/not-found";
import { AddToHomePrompt } from "@/components/add-to-home-prompt";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/travel-companion" component={Home} />
      <Route path="/travel-companion/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <AddToHomePrompt />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
