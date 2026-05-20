import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ElectionProvider } from "@/lib/context";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";
import AuthPage from "@/pages/auth";
import AdminCheckPage from "@/pages/admin-check";
import PortalSelectPage from "@/pages/portal-select";
import VoterPortalPage from "@/pages/voter-portal";
import CandidatePortalPage from "@/pages/candidate-portal";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import OverviewPage from "@/pages/overview";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PublicLayout><OverviewPage /></PublicLayout>
      </Route>
      <Route path="/auth">
        <PublicLayout><AuthPage /></PublicLayout>
      </Route>
      <Route path="/check">
        <PublicLayout><AdminCheckPage /></PublicLayout>
      </Route>
      <Route path="/portal">
        <PublicLayout><PortalSelectPage /></PublicLayout>
      </Route>
      <Route path="/voter-portal">
        <PublicLayout><VoterPortalPage /></PublicLayout>
      </Route>
      <Route path="/candidate-portal">
        <PublicLayout><CandidatePortalPage /></PublicLayout>
      </Route>
      <Route path="/login/:role">
        <PublicLayout><LoginPage /></PublicLayout>
      </Route>
      <Route path="/dashboard" component={DashboardPage} />
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ElectionProvider>
          <TooltipProvider>
            <WouterRouter>
               <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </ElectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
