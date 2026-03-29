import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import AiLeadGenerationPage from "@/pages/services/AiLeadGeneration";
import AiConversationalAgentsPage from "@/pages/services/AiConversationalAgents";
import CrmAutomationPage from "@/pages/services/CrmAutomation";
import ConversionFunnelsPage from "@/pages/services/ConversionFunnels";
import SmmaPage from "@/pages/services/Smma";
import ContentCreationPage from "@/pages/services/ContentCreation";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/ai-lead-generation" component={AiLeadGenerationPage} />
      <Route path="/services/ai-conversational-agents" component={AiConversationalAgentsPage} />
      <Route path="/services/crm-automation" component={CrmAutomationPage} />
      <Route path="/services/conversion-funnels" component={ConversionFunnelsPage} />
      <Route path="/services/smma" component={SmmaPage} />
      <Route path="/services/content-creation" component={ContentCreationPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
