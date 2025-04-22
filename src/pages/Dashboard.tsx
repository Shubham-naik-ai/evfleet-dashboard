import { useState, useEffect } from "react";
import { Bus, Gauge, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import FleetStatusChart from "@/components/dashboard/FleetStatusChart";
import IdleVehiclesChart from "@/components/dashboard/IdleVehiclesChart";
import VehicleStatusChart from "@/components/dashboard/VehicleStatusChart";
import VtsDeviceStatusChart from "@/components/dashboard/VtsDeviceStatusChart";
import StoppedVehiclesChart from "@/components/dashboard/StoppedVehiclesChart";
import IndiaMap from "@/components/dashboard/IndiaMap";
import { KilometerCard } from "@/components/analysis/KilometerCard";
import { VehicleExpiryWidget } from "@/components/dashboard/VehicleExpiryWidget";
import { DailyDistanceChart } from "@/components/dashboard/DailyDistanceChart";
import TotalVehiclesCard from "@/components/dashboard/TotalVehiclesCard";
import EmergencyAlertsCard from "@/components/dashboard/EmergencyAlertsCard";
import DriverLicenseExpiryWidget from "@/components/dashboard/DriverLicenseExpiryWidget";
import CO2EmissionCard from "@/components/analysis/CO2EmissionCard";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fleetStatusData = [
    { name: "In Depot", value: 427, color: "#0EA5E9" }, // Blue
    { name: "On Route", value: 648, color: "#10B981" }, // Green
    { name: "Maintenance", value: 150, color: "#F59E0B" }, // Amber
  ];

  const idleVehiclesData = [
    { name: "0 Hrs", value: 128, color: "#10B981" }, // Green
    { name: "0-2 Hrs", value: 246, color: "#0EA5E9" }, // Blue
    { name: "2-5 Hrs", value: 183, color: "#F59E0B" }, // Amber
    { name: "> 5 Hrs", value: 97, color: "#EF4444" }, // Red
  ];

  const vehicleCounts = {
    running: 856,
    active: 222,
    stopped: 147,
  };

  const weeklyPerformanceData = [
    { day: "Mon", efficiency: 92 },
    { day: "Tue", efficiency: 87 },
    { day: "Wed", efficiency: 95 },
    { day: "Thu", efficiency: 89 },
    { day: "Fri", efficiency: 91 },
    { day: "Sat", efficiency: 84 },
    { day: "Sun", efficiency: 78 },
  ];

  const vehicleStatusData = [
    { name: "Running", value: 427, color: "#10B981" }, // Green
    { name: "Idle", value: 248, color: "#0EA5E9" }, // Blue
    { name: "Stop", value: 150, color: "#F59E0B" }, // Amber
  ];

  const stoppedVehiclesData = [
    { name: "Maintenance", value: 45, color: "#F59E0B" }, // Amber
    { name: "Breakdown", value: 32, color: "#EF4444" }, // Red
    { name: "Scheduled", value: 73, color: "#0EA5E9" }, // Blue
  ];

  const vtsDeviceData = [
    { name: "Active", value: 723, color: "#10B981" }, // Green
    { name: "Inactive", value: 102, color: "#EF4444" }, // Red
  ];

  const emergencyAlerts = [
    { type: "Overspeeding", count: 23, color: "#EF4444" },
    { type: "Harsh Acceleration", count: 15, color: "#F59E0B" },
    { type: "Harsh Braking", count: 18, color: "#0EA5E9" },
    { type: "Route Deviation", count: 12, color: "#8B5CF6" },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Bus size={48} className="text-ev-blue animate-pulse-soft" />
          <h2 className="mt-4 text-lg font-medium">Loading dashboard...</h2>
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
          <DashboardHeader 
            title="Fleet Management Dashboard" 
            subtitle="Overview of your EV fleet performance and statistics"
          />
          
          <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4">
            <StatCard 
              title="Total Depots" 
              value="49" 
              icon={<Bus className="h-5 w-5" />} 
              colorClass="stat-card-green"
            />
            <StatCard 
              title="Total Vehicles" 
              value="1,225" 
              icon={<Bus className="h-5 w-5" />} 
              colorClass="stat-card-yellow"
            />
            <StatCard 
              title="Current Month KMs (GPS)" 
              value="1,258,467" 
              icon={<Gauge className="h-5 w-5" />} 
              colorClass="stat-card-purple"
            />
            <CO2EmissionCard
              value={72893}
              change={4.6}
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-5">
            <FleetStatusChart className="[&_.recharts-legend-item-text]:text-xs [&_span.text-xs]:!text-[10px]" data={fleetStatusData} />
            <VehicleStatusChart className="[&_.recharts-legend-item-text]:text-xs [&_span.text-xs]:!text-[10px]" data={vehicleStatusData} />
            <IdleVehiclesChart className="[&_.recharts-legend-item-text]:text-xs [&_span.text-xs]:!text-[10px]" data={idleVehiclesData} />
            <StoppedVehiclesChart className="[&_.recharts-legend-item-text]:text-xs [&_span.text-xs]:!text-[10px]" data={stoppedVehiclesData} />
            <VtsDeviceStatusChart className="[&_.recharts-legend-item-text]:text-xs [&_span.text-xs]:!text-[10px]" data={vtsDeviceData} />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Key Performance Metrics</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <KilometerCard 
                title="Total Kilometers" 
                value="331,518,824 km" 
                change="↑ 3.2% from last month" 
                trend="up"
                icon="navigation"
              />
              <KilometerCard 
                title="Monthly Distance Covered" 
                value="2,845,672 km" 
                change="↑ 4.1% from last month" 
                trend="up"
                icon="calendar"
              />
              <KilometerCard 
                title="Avg Daily Distance" 
                value="48,560 km" 
                change="↑ 5.2% from yesterday" 
                trend="up"
                icon="route"
              />
              <KilometerCard 
                title="Avg KMs Per Charge" 
                value="287 km" 
                change="↑ 2.3% improvement" 
                trend="up"
                icon="gauge"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <DailyDistanceChart />
            <EmergencyAlertsCard alerts={emergencyAlerts} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <VehicleExpiryWidget 
              title="Insurance Expiry" 
              icon="calendar"
              expiryData={{
                "7 days": 4,
                "30 days": 12,
                "60 days": 25,
                "90 days": 32
              }}
            />
            <VehicleExpiryWidget 
              title="Fitness Certificate Expiry" 
              icon="file"
              expiryData={{
                "7 days": 2,
                "30 days": 8,
                "60 days": 14,
                "90 days": 23
              }}
            />
            <VehicleExpiryWidget 
              title="VTS Validity Expiry" 
              icon="clock"
              expiryData={{
                "7 days": 3,
                "30 days": 10,
                "60 days": 18,
                "90 days": 29
              }}
            />
            <DriverLicenseExpiryWidget
              expiryData={{
                "7 days": 1,
                "30 days": 6,
                "60 days": 11,
                "90 days": 17
              }}
            />
          </div>

          <div className="mt-6">
            <IndiaMap />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
