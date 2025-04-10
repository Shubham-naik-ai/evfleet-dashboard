
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Vehicle, VehicleFormInput } from "@/types/vehicle";
import VehicleForm from "@/components/vehicles/VehicleForm";
import CSVUploader from "@/components/vehicles/CSVUploader";
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  downloadVehiclesCSV
} from "@/services/vehicleService";

export default function AllVehicles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  const queryClient = useQueryClient();
  
  // Query to fetch all vehicles
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getAllVehicles
  });
  
  // Mutation to create a new vehicle
  const createVehicleMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setIsAddDialogOpen(false);
    }
  });
  
  // Mutation to update a vehicle
  const updateVehicleMutation = useMutation({
    mutationFn: (data: { id: number; vehicle: Partial<VehicleFormInput> }) => 
      updateVehicle(data.id, data.vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setIsEditDialogOpen(false);
    }
  });
  
  // Mutation to delete a vehicle
  const deleteVehicleMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setIsDeleteDialogOpen(false);
      setSelectedVehicle(null);
    }
  });
  
  // Filtered vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => {
    const query = searchQuery.toLowerCase();
    return (
      vehicle.vehicle_id.toLowerCase().includes(query) ||
      vehicle.depot.toLowerCase().includes(query) ||
      vehicle.imei_no.toLowerCase().includes(query) ||
      vehicle.registration_no.toLowerCase().includes(query) ||
      vehicle.chassis_no.toLowerCase().includes(query) ||
      vehicle.engine_no.toLowerCase().includes(query) ||
      (vehicle.device_make && vehicle.device_make.toLowerCase().includes(query)) ||
      vehicle.status.toLowerCase().includes(query) ||
      (vehicle.remarks && vehicle.remarks.toLowerCase().includes(query))
    );
  });
  
  // Handle bulk upload
  const handleBulkUpload = async (vehicles: VehicleFormInput[]) => {
    try {
      let successCount = 0;
      let failureCount = 0;
      
      // Process each vehicle
      for (const vehicle of vehicles) {
        try {
          await createVehicle(vehicle);
          successCount++;
        } catch (error) {
          console.error("Failed to add vehicle:", error);
          failureCount++;
        }
      }
      
      // Refresh the vehicles list
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setIsUploadDialogOpen(false);
      
      return { success: successCount, failures: failureCount };
    } catch (error) {
      throw new Error("Failed to process bulk upload");
    }
  };
  
  // Handle CSV download
  const handleDownload = async () => {
    try {
      const csvContent = await downloadVehiclesCSV();
      
      // Create a Blob from the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a download link and trigger the download
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'vehicles.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your vehicle data is being downloaded as a CSV file.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download vehicle data",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar className="hidden lg:flex" />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Vehicle Management</h1>
            <p className="text-muted-foreground">View and manage all vehicles in the fleet</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:w-auto flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vehicles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={handleDownload}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Download</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsUploadDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden md:inline">Upload</span>
              </Button>
              
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">Add Vehicle</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>List of all vehicles in the fleet</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Depot</TableHead>
                  <TableHead>ODO Reading</TableHead>
                  <TableHead>SoC</TableHead>
                  <TableHead>IMEI No.</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading vehicles...
                    </TableCell>
                  </TableRow>
                ) : filteredVehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No vehicles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.vehicle_id}</TableCell>
                      <TableCell>{vehicle.depot}</TableCell>
                      <TableCell>{vehicle.odo_reading || '-'}</TableCell>
                      <TableCell>{vehicle.soc !== null ? `${vehicle.soc}%` : '-'}</TableCell>
                      <TableCell>{vehicle.imei_no}</TableCell>
                      <TableCell>{vehicle.registration_no}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                          vehicle.status === 'CHARGING' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
      
      {/* Add Vehicle Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter the details for the new vehicle
            </DialogDescription>
          </DialogHeader>
          <VehicleForm
            onSubmit={createVehicleMutation.mutateAsync}
            onCancel={() => setIsAddDialogOpen(false)}
            isLoading={createVehicleMutation.isPending}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>
              Update the details for this vehicle
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <VehicleForm
              initialData={selectedVehicle}
              onSubmit={async (data) => {
                await updateVehicleMutation.mutateAsync({
                  id: selectedVehicle.id,
                  vehicle: data
                });
              }}
              onCancel={() => setIsEditDialogOpen(false)}
              isLoading={updateVehicleMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* View Vehicle Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
            <DialogDescription>
              Detailed information about this vehicle
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Vehicle ID</p>
                    <p>{selectedVehicle.vehicle_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Depot</p>
                    <p>{selectedVehicle.depot}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                      selectedVehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      selectedVehicle.status === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                      selectedVehicle.status === 'CHARGING' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedVehicle.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Heartbeat</p>
                    <p>{selectedVehicle.last_heartbeat 
                      ? new Date(selectedVehicle.last_heartbeat).toLocaleString() 
                      : '-'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Vehicle Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Registration No.</p>
                    <p>{selectedVehicle.registration_no}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Chassis No.</p>
                    <p>{selectedVehicle.chassis_no}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Engine No.</p>
                    <p>{selectedVehicle.engine_no}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Telematics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">ODO Reading</p>
                    <p>{selectedVehicle.odo_reading || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">State of Charge (SoC)</p>
                    <p>{selectedVehicle.soc !== null ? `${selectedVehicle.soc}%` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">IMEI No.</p>
                    <p>{selectedVehicle.imei_no}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Device Make</p>
                    <p>{selectedVehicle.device_make || '-'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Remarks</p>
                    <p>{selectedVehicle.remarks || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created At</p>
                    <p>{new Date(selectedVehicle.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p>{new Date(selectedVehicle.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Upload Vehicles Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Upload Vehicles</DialogTitle>
            <DialogDescription>
              Upload a CSV file with vehicle data
            </DialogDescription>
          </DialogHeader>
          <CSVUploader onUpload={handleBulkUpload} />
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              Download Template
            </Button>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the vehicle {selectedVehicle?.vehicle_id} ({selectedVehicle?.registration_no}).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedVehicle) {
                  deleteVehicleMutation.mutate(selectedVehicle.id);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
