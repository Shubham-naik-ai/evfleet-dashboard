
import { useState, useEffect } from "react";
import { FilterIcon, DownloadIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KilometerCard } from "@/components/analysis/KilometerCard";
import { DailyLossKmChart } from "@/components/analysis/DailyLossKmChart";
import { RouteLossKmTable } from "@/components/analysis/RouteLossKmTable";
import { LossReasonsPieChart } from "@/components/analysis/LossReasonsPieChart";
import { LossReasonsBarChart } from "@/components/analysis/LossReasonsBarChart";
import { ResponsibilityChart } from "@/components/analysis/ResponsibilityChart";
import { BusLossTable } from "@/components/analysis/BusLossTable";
import { MonthlyLossChart } from "@/components/analysis/MonthlyLossChart";

const LossKmsAnalysis = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: "All",
    depot: "All",
    busType: "All",
    busRegNo: "All",
    lossReasons: "All",
    responsibility: "All"
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCw size={48} className="text-ev-blue animate-spin" />
          <h2 className="mt-4 text-lg font-medium">Loading analysis dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar className="hidden lg:flex" />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <DashboardHeader 
              title="Loss KMs Analysis" 
              subtitle="Analyze operational inefficiencies and service losses"
            />

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-ev-blue text-white rounded-md hover:bg-ev-blue/90 transition-colors">
                <DownloadIcon size={16} />
                Export Report
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <RefreshCw size={16} />
                Refresh Data
              </button>
            </div>
          </div>
          
          {/* Filters Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <div className="w-full">
              <Select value={filters.month} onValueChange={(value) => handleFilterChange("month", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Months</SelectItem>
                  <SelectItem value="Jan">January 2025</SelectItem>
                  <SelectItem value="Feb">February 2025</SelectItem>
                  <SelectItem value="Mar">March 2025</SelectItem>
                  <SelectItem value="Apr">April 2025</SelectItem>
                  <SelectItem value="May">May 2025</SelectItem>
                  <SelectItem value="Jun">June 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.depot} onValueChange={(value) => handleFilterChange("depot", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Depot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Depots</SelectItem>
                  <SelectItem value="Depot1">Depot Central</SelectItem>
                  <SelectItem value="Depot2">North Station</SelectItem>
                  <SelectItem value="Depot3">East Terminal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.busType} onValueChange={(value) => handleFilterChange("busType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bus Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="Non-AC">Non-AC</SelectItem>
                  <SelectItem value="Mini">Mini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.busRegNo} onValueChange={(value) => handleFilterChange("busRegNo", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bus Reg. No." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Buses</SelectItem>
                  <SelectItem value="MH12AB1234">MH12AB1234</SelectItem>
                  <SelectItem value="MH12CD5678">MH12CD5678</SelectItem>
                  <SelectItem value="MH12EF9012">MH12EF9012</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.lossReasons} onValueChange={(value) => handleFilterChange("lossReasons", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Loss Reasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Reasons</SelectItem>
                  <SelectItem value="Accident">Accident</SelectItem>
                  <SelectItem value="Breakdown">Breakdown</SelectItem>
                  <SelectItem value="Late Start">Late Start</SelectItem>
                  <SelectItem value="Route Diversion">Route Diversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.responsibility} onValueChange={(value) => handleFilterChange("responsibility", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Responsibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Authority">Authority</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Dashboard Tiles/KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
            <KilometerCard 
              title="Scheduled Buses" 
              value={325} 
              className="bg-white"
            />
            <KilometerCard 
              title="Scheduled KMs" 
              value="1,985,450" 
              className="bg-white"
            />
            <KilometerCard 
              title="Operated KMs" 
              value="1,875,323" 
              className="bg-white"
            />
            <KilometerCard 
              title="SOC Consumed" 
              value="945,120" 
              className="bg-white"
            />
            <KilometerCard 
              title="KM per SOC" 
              value="1.98" 
              className="bg-white"
            />
            <KilometerCard 
              title="Accidents" 
              value={58} 
              className="bg-white"
            />
            <KilometerCard 
              title="Loss KMs" 
              value="110,127" 
              className="bg-white text-red-500"
            />
          </div>
          
          {/* Visual Analytics - First Row */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-12">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Date-wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <DailyLossKmChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Visual Analytics - Second Row */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-5">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Route-wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <RouteLossKmTable />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Loss KMs by Routes and Loss Reasons
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <LossReasonsPieChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Visual Analytics - Third Row */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    No. of Buses by Loss Reasons
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <LossReasonsBarChart />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Loss KMs by Responsibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsibilityChart />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Bus-wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <BusLossTable />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Visual Analytics - Fourth Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Month-wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <MonthlyLossChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-muted-foreground">
            Data Last Updated: 4/10/2025 10:15:22 AM
          </div>
        </main>
      </div>
    </div>
  );
};

export default LossKmsAnalysis;
