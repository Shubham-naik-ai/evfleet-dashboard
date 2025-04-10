
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Battery, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getLiveVehicles } from "@/services/vehicleService";
import { Vehicle } from "@/types/vehicle";

export default function LiveVehicles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    data: vehicles = [], 
    isLoading, 
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['liveVehicles'],
    queryFn: getLiveVehicles
  });
  
  // Filter vehicles based on search
  const filteredVehicles = vehicles.filter(vehicle => {
    const query = searchQuery.toLowerCase();
    return (
      vehicle.vehicle_id.toLowerCase().includes(query) ||
      vehicle.depot.toLowerCase().includes(query) ||
      vehicle.registration_no.toLowerCase().includes(query)
    );
  });
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Function to render battery status indicator
  const renderBatteryStatus = (soc: number | null) => {
    if (soc === null) return <span className="text-muted-foreground">Unknown</span>;
    
    let color = '';
    if (soc >= 70) color = 'text-green-600';
    else if (soc >= 30) color = 'text-yellow-600';
    else color = 'text-red-600';
    
    return (
      <div className="flex items-center gap-2">
        <Battery className={`h-4 w-4 ${color}`} />
        <span className={color}>{soc}%</span>
      </div>
    );
  };
  
  // Function to format timestamp
  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleString();
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar className="hidden lg:flex" />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Live Vehicles</h1>
            <p className="text-muted-foreground">Monitor currently active vehicles in real-time</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:w-auto flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search active vehicles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              disabled={isRefetching}
              className="w-full md:w-auto"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-border/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">Active Vehicles</h3>
                <div className="rounded-full bg-green-100 p-2">
                  <Battery className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">{vehicles.length}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Total currently active in fleet
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-border/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">Average Battery</h3>
                <div className="rounded-full bg-yellow-100 p-2">
                  <Battery className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">
                {vehicles.length > 0 
                  ? `${Math.round(vehicles.reduce((acc, v) => acc + (v.soc || 0), 0) / vehicles.length)}%` 
                  : "N/A"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Average state of charge
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-border/40">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">Updated</h3>
                <div className="rounded-full bg-blue-100 p-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">
                {isRefetching ? "Updating..." : "Just now"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Last data refresh time
              </p>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>List of all currently active vehicles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Depot</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>ODO Reading</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading live vehicles...
                    </TableCell>
                  </TableRow>
                ) : filteredVehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No active vehicles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.vehicle_id}</TableCell>
                      <TableCell>{vehicle.registration_no}</TableCell>
                      <TableCell>{vehicle.depot}</TableCell>
                      <TableCell>{renderBatteryStatus(vehicle.soc)}</TableCell>
                      <TableCell>{vehicle.odo_reading || 'N/A'}</TableCell>
                      <TableCell>{formatTime(vehicle.last_heartbeat)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
