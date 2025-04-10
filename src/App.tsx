
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DORAnalysis from "./pages/DORAnalysis";
import AllVehicles from "./pages/vehicles/AllVehicles";
import LiveVehicles from "./pages/vehicles/LiveVehicles";
import VehicleHistory from "./pages/vehicles/VehicleHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analysis" element={<DORAnalysis />} />
          <Route path="/vehicles" element={<AllVehicles />} />
          <Route path="/vehicles/live" element={<LiveVehicles />} />
          <Route path="/vehicles/history" element={<VehicleHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
