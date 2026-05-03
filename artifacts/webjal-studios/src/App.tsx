import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
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
        <Route path="/" component={() => <PageTransition><Home /></PageTransition>} />
        <Route path="/gym" component={() => <PageTransition><GymPage /></PageTransition>} />
        <Route path="/salon" component={() => <PageTransition><SalonPage /></PageTransition>} />
        <Route path="/library" component={() => <PageTransition><LibraryPage /></PageTransition>} />
        <Route path="/realestate" component={() => <PageTransition><RealEstatePage /></PageTransition>} />
        <Route path="/restaurant" component={() => <PageTransition><RestaurantPage /></PageTransition>} />
        <Route path="/ecommerce" component={() => <PageTransition><EcommercePage /></PageTransition>} />
        <Route component={() => <PageTransition><NotFound /></PageTransition>} />
      </Switch>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, scale: 0.98, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
