import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Home from "@/pages/Home";
import GymPage from "@/pages/GymPage";
import SalonPage from "@/pages/SalonPage";
import LibraryPage from "@/pages/LibraryPage";
import RealEstatePage from "@/pages/RealEstatePage";
import RestaurantPage from "@/pages/RestaurantPage";
import EcommercePage from "@/pages/EcommercePage";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/gym" component={GymPage} />
        <Route path="/salon" component={SalonPage} />
        <Route path="/library" component={LibraryPage} />
        <Route path="/realestate" component={RealEstatePage} />
        <Route path="/restaurant" component={RestaurantPage} />
        <Route path="/ecommerce" component={EcommercePage} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        {loading ? (
          <Loader onComplete={() => setLoading(false)} />
        ) : (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
