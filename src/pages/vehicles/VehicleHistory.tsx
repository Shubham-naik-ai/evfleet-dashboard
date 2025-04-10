
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getAllVehicles } from "@/services/vehicleService";

export default function VehicleHistory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  
  // Query to fetch all vehicles for the dropdown
  const { data: vehicles = [] } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getAllVehicles
  });
  
  // Simulated history data (would come from a real API)
  const historyData = [
    {
      id: 1,
      vehicle_id: "8272",
      registration_no: "MH04LQ8272",
      event: "Status Change",
      detail: "Status changed from INACTIVE to ACTIVE",
      timestamp: "2025-04-10T09:30:00Z"
    },
    {
      id: 2,
      vehicle_id: "8272",
      registration_no: "MH04LQ8272",
      event: "SoC Update",
      detail: "Battery level updated to 45%",
      timestamp: "2025-04-10T09:15:00Z"
    },
    {
      id: 3,
      vehicle_id: "8272",
      registration_no: "MH04LQ8272",
      event: "Maintenance",
      detail: "Scheduled maintenance completed",
      timestamp: "2025-04-09T14:20:00Z"
    },
    {
      id: 4,
      vehicle_id: "8273",
      registration_no: "MH04LQ8273",
      event: "Status Change",
      detail: "Status changed from MAINTENANCE to ACTIVE",
      timestamp: "2025-04-10T08:45:00Z"
    },
    {
      id: 5,
      vehicle_id: "8273",
      registration_no: "MH04LQ8273",
      event: "Location Update",
      detail: "Vehicle returned to depot",
      timestamp: "2025-04-10T08:40:00Z"
    },
    {
      id: 6,
      vehicle_id: "8274",
      registration_no: "MH04LQ8274",
      event: "Status Change",
      detail: "Status changed from ACTIVE to MAINTENANCE",
      timestamp: "2025-04-09T16:30:00Z"
    },
    {
      id: 7,
      vehicle_id: "8274",
      registration_no: "MH04LQ8274",
      event: "Warning",
      detail: "Low battery warning (22%)",
      timestamp: "2025-04-09T16:15:00Z"
    },
  ];
  
  // Filter history based on search and selected vehicle
  const filteredHistory = historyData.filter(item => {
    const matchesSearch = 
      item.vehicle_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.registration_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVehicle = selectedVehicle === "all" || item.vehicle_id === selectedVehicle;
    
    return matchesSearch && matchesVehicle;
  });
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Format timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar className="hidden lg:flex" />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Vehicle History</h1>
            <p className="text-muted-foreground">View the activity history of all vehicles in the fleet</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:w-auto flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search history..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground hidden md:inline">Filter by:</span>
              </div>
              <Select
                value={selectedVehicle}
                onValueChange={setSelectedVehicle}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                      {vehicle.vehicle_id} - {vehicle.registration_no}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>
                {selectedVehicle === "all" 
                  ? "Activity history for all vehicles" 
                  : `Activity history for vehicle ${selectedVehicle}`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No history records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.vehicle_id}</TableCell>
                      <TableCell>{item.registration_no}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.event === 'Status Change' ? 'bg-blue-100 text-blue-800' :
                          item.event === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          item.event === 'Warning' ? 'bg-red-100 text-red-800' :
                          item.event === 'SoC Update' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.event}
                        </span>
                      </TableCell>
                      <TableCell>{item.detail}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(item.timestamp)}</span>
                        </div>
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
