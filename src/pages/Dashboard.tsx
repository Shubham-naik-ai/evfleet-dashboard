
import { useState, useEffect } from "react";
import { Bus, Route, Calendar, Users, Gauge, Battery, Laptop, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import FleetStatusChart from "@/components/dashboard/FleetStatusChart";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  const fleetStatusData = [
    { name: "In Depot", value: 1078, color: "#10B981" },
    { name: "On Route", value: 921, color: "#0EA5E9" },
    { name: "Maintenance", value: 226, color: "#F59E0B" },
  ];

  const recentActivities = [
    {
      id: "1",
      title: "Vehicle EV1045 entered maintenance",
      description: "Scheduled maintenance for battery replacement",
      time: "2 hours ago",
      type: "maintenance"
    },
    {
      id: "2",
      title: "Route 57 completed",
      description: "Bus EV0721 completed route with 100% efficiency",
      time: "3 hours ago",
      type: "route"
    },
    {
      id: "3",
      title: "Device update completed",
      description: "Firmware updated on 15 vehicles",
      time: "5 hours ago",
      type: "system"
    },
    {
      id: "4",
      title: "New vehicle assigned to Depot 7",
      description: "EV0892 transferred from central facility",
      time: "Yesterday",
      type: "depot"
    },
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
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <StatCard 
              title="Total Depots" 
              value="49" 
              icon={<MapPin className="h-5 w-5" />} 
              colorClass="stat-card-blue"
            />
            <StatCard 
              title="Total Vehicles" 
              value="2,225" 
              icon={<Bus className="h-5 w-5" />} 
              colorClass="stat-card-green"
              subStats={[
                { label: "In Depot", value: "1,078", color: "green" },
                { label: "On Route", value: "921", color: "blue" },
                { label: "Under Maintenance", value: "226", color: "yellow" },
              ]}
            />
            <StatCard 
              title="Total Routes" 
              value="296" 
              icon={<Route className="h-5 w-5" />} 
              colorClass="stat-card-purple"
            />
            <StatCard 
              title="Total Schedules" 
              value="1,037" 
              icon={<Calendar className="h-5 w-5" />} 
              colorClass="stat-card-yellow"
              subStats={[
                { label: "To be Allocated", value: "1,037", color: "yellow" },
                { label: "Allocated", value: "0", color: "green" },
              ]}
            />
            <StatCard 
              title="Total Devices" 
              value="2,225" 
              icon={<Laptop className="h-5 w-5" />} 
              colorClass="stat-card-blue"
              subStats={[
                { label: "Active", value: "131", color: "green" },
                { label: "Inactive", value: "2,094", color: "red" },
              ]}
            />
            <StatCard 
              title="CAN Vehicles" 
              value="2,225" 
              icon={<Gauge className="h-5 w-5" />} 
              colorClass="stat-card-red"
              subStats={[
                { label: "Active", value: "131", color: "green" },
                { label: "Inactive", value: "2,094", color: "red" },
              ]}
            />
            <StatCard 
              title="Total Kilometers" 
              value="331,518,824" 
              icon={<Route className="h-5 w-5" />} 
              colorClass="stat-card-green"
            />
            <StatCard 
              title="Total Users" 
              value="97" 
              icon={<Users className="h-5 w-5" />} 
              colorClass="stat-card-purple"
              subStats={[
                { label: "Contracted", value: "0", color: "blue" },
                { label: "In-house", value: "0", color: "purple" },
              ]}
            />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <FleetStatusChart data={fleetStatusData} />
            <div className="lg:col-span-2">
              <ActivityTimeline items={recentActivities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
