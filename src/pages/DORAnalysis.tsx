
import { useState, useEffect } from "react";
import { FilterIcon, DownloadIcon, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
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
import { KilometerCard } from "@/components/analysis/KilometerCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyKilometerChart } from "@/components/analysis/DailyKilometerChart";
import { RouteKilometerTable } from "@/components/analysis/RouteKilometerTable";
import { LossReasonsPieChart } from "@/components/analysis/LossReasonsPieChart";
import { LossReasonsBarChart } from "@/components/analysis/LossReasonsBarChart";
import { ResponsibilityChart } from "@/components/analysis/ResponsibilityChart";
import { BusLossTable } from "@/components/analysis/BusLossTable";
import { MonthlyLossChart } from "@/components/analysis/MonthlyLossChart";

const DORAnalysis = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    month: "All",
    depot: "All",
    busType: "All",
    busRegNo: "All",
    lossReasons: "All",
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
              title="DOR Analysis" 
              subtitle="Distance Operated Ratio analysis for your fleet"
            />

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-ev-blue text-white rounded-md hover:bg-ev-blue/90 transition-colors">
                <DownloadIcon size={16} />
                Export
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="w-full">
              <Select value={filters.month} onValueChange={(value) => handleFilterChange("month", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Months</SelectItem>
                  <SelectItem value="Jan">January</SelectItem>
                  <SelectItem value="Feb">February</SelectItem>
                  <SelectItem value="Mar">March</SelectItem>
                  <SelectItem value="Apr">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="Jun">June</SelectItem>
                  <SelectItem value="Jul">July</SelectItem>
                  <SelectItem value="Aug">August</SelectItem>
                  <SelectItem value="Sep">September</SelectItem>
                  <SelectItem value="Oct">October</SelectItem>
                  <SelectItem value="Nov">November</SelectItem>
                  <SelectItem value="Dec">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.depot} onValueChange={(value) => handleFilterChange("depot", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Depot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Depots</SelectItem>
                  <SelectItem value="Depot1">Pune Central</SelectItem>
                  <SelectItem value="Depot2">Nigdi</SelectItem>
                  <SelectItem value="Depot3">Kothrud</SelectItem>
                  <SelectItem value="Depot4">Baner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.busType} onValueChange={(value) => handleFilterChange("busType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bus Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Bus Types</SelectItem>
                  <SelectItem value="Type1">Standard</SelectItem>
                  <SelectItem value="Type2">Midi</SelectItem>
                  <SelectItem value="Type3">Mini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.busRegNo} onValueChange={(value) => handleFilterChange("busRegNo", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bus Reg. No." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Bus Numbers</SelectItem>
                  <SelectItem value="MH12NE9391">MH12NE9391</SelectItem>
                  <SelectItem value="MH12NE8576">MH12NE8576</SelectItem>
                  <SelectItem value="MH12YV8572">MH12YV8572</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full">
              <Select value={filters.lossReasons} onValueChange={(value) => handleFilterChange("lossReasons", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Loss Reasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Loss Reasons</SelectItem>
                  <SelectItem value="Reason1">Heavy Traffic</SelectItem>
                  <SelectItem value="Reason2">No Bus Charging</SelectItem>
                  <SelectItem value="Reason3">Maintenance</SelectItem>
                  <SelectItem value="Reason4">Breakdown</SelectItem>
                  <SelectItem value="Reason5">No Bus Conductor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <KilometerCard 
              title="Scheduled Buses" 
              value={312} 
              className="bg-white"
            />
            <KilometerCard 
              title="Scheduled KM" 
              value="1,955,861" 
              className="bg-white"
            />
            <KilometerCard 
              title="Operated KM" 
              value="1,861,430" 
              className="bg-white"
            />
            <KilometerCard 
              title="SOC Consumed" 
              value="923,255" 
              className="bg-white"
            />
            <KilometerCard 
              title="Accidents" 
              value={62} 
              className="bg-white"
            />
          </div>
          
          {/* FIFO Performance */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 md:col-span-3">
              <Card className="overflow-hidden h-full">
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    First Bus KM/SOC
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-32 h-32 rounded-full border-8 border-ev-blue flex items-center justify-center text-4xl font-bold">
                    1.9
                  </div>
                  <p className="text-sm text-center mt-4 text-muted-foreground">
                    Dec 13, 2024
                    <br />
                    Avg. SOC 80.23 kW
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Date wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <DailyKilometerChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Route KMs and Loss Reasons */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-5">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Loss KMs by Routes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <RouteKilometerTable />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Loss KMs by Route and Loss Reasons
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <LossReasonsPieChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Loss Reasons Data */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    No. of Buses by Loss Reasons
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="px-4 py-3 text-left font-medium">Loss Reasons</th>
                          <th className="px-4 py-3 text-right font-medium">No. of Bus</th>
                          <th className="px-4 py-3 text-right font-medium">No. of Incidents</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">Heavy Traffic</td>
                          <td className="px-4 py-2.5 text-right">168</td>
                          <td className="px-4 py-2.5 text-right">927</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">No Bus Charging</td>
                          <td className="px-4 py-2.5 text-right">121</td>
                          <td className="px-4 py-2.5 text-right">1,051</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">Maintenance</td>
                          <td className="px-4 py-2.5 text-right">114</td>
                          <td className="px-4 py-2.5 text-right">261</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">Breakdown</td>
                          <td className="px-4 py-2.5 text-right">92</td>
                          <td className="px-4 py-2.5 text-right">267</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">No Bus Conductor</td>
                          <td className="px-4 py-2.5 text-right">82</td>
                          <td className="px-4 py-2.5 text-right">120</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">Driver Not available</td>
                          <td className="px-4 py-2.5 text-right">42</td>
                          <td className="px-4 py-2.5 text-right">101</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="px-4 py-2.5">Switch Over</td>
                          <td className="px-4 py-2.5 text-right">50</td>
                          <td className="px-4 py-2.5 text-right">87</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
                      <span>1 - 7 / 17</span>
                      <div className="flex items-center gap-1">
                        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors">
                          <ChevronLeft size={16} />
                        </button>
                        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Loss KMs by Reasons
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
          </div>
          
          {/* Bottom Tables and Charts */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Bus wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <BusLossTable />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Card>
                <CardHeader className="bg-ev-blue/5 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Month wise Loss KMs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <MonthlyLossChart />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-muted-foreground">
            Data Last Updated: 5/22/2024 12:35:18 PM
          </div>
        </main>
      </div>
    </div>
  );
};

export default DORAnalysis;
