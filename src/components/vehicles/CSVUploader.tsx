
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload, AlertTriangle, Check } from "lucide-react";
import { validateVehicle } from "@/services/vehicleService";
import { VehicleFormInput } from "@/types/vehicle";

interface CSVUploaderProps {
  onUpload: (vehicles: VehicleFormInput[]) => Promise<{ success: number; failures: number }>;
}

export default function CSVUploader({ onUpload }: CSVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): VehicleFormInput[] => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map(header => header.trim().toLowerCase());
    
    const vehicles: VehicleFormInput[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(",").map(value => value.trim());
      if (values.length !== headers.length) continue;
      
      const vehicle: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        const mappedHeader = mapHeaderToFieldName(header);
        if (mappedHeader) {
          vehicle[mappedHeader] = values[index];
        }
      });
      
      // Process numeric values
      if (vehicle.odo_reading) vehicle.odo_reading = parseInt(vehicle.odo_reading) || null;
      if (vehicle.soc) vehicle.soc = parseInt(vehicle.soc) || null;
      
      // Add default status if not present
      if (!vehicle.status) vehicle.status = "INACTIVE";
      
      vehicles.push(vehicle as VehicleFormInput);
    }
    
    return vehicles;
  };
  
  const mapHeaderToFieldName = (header: string): string | null => {
    const mapping: Record<string, string> = {
      "vehicle id": "vehicle_id",
      "depot": "depot",
      "odo reading": "odo_reading",
      "soc": "soc",
      "imei no": "imei_no",
      "imei no.": "imei_no",
      "imei": "imei_no",
      "registration no": "registration_no",
      "registration no.": "registration_no",
      "registration": "registration_no",
      "chassis no": "chassis_no",
      "chassis no.": "chassis_no",
      "chassis": "chassis_no",
      "engine no": "engine_no",
      "engine no.": "engine_no",
      "engine": "engine_no",
      "device make": "device_make",
      "last heartbeat": "last_heartbeat",
      "status": "status",
      "remarks": "remarks"
    };
    
    return mapping[header] || null;
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const text = await selectedFile.text();
      const vehicles = parseCSV(text);
      
      if (vehicles.length === 0) {
        toast({
          title: "No valid data found",
          description: "The CSV file doesn't contain any valid vehicle data",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      // Validate each vehicle
      const invalidVehicles = vehicles.filter(vehicle => validateVehicle(vehicle).length > 0);
      
      if (invalidVehicles.length > 0) {
        toast({
          title: "Invalid data detected",
          description: `${invalidVehicles.length} vehicles have invalid or missing required data`,
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      
      const result = await onUpload(vehicles);
      
      toast({
        title: "Upload completed",
        description: `Successfully added ${result.success} vehicles${result.failures > 0 ? `. Failed to add ${result.failures} vehicles.` : ''}`,
        variant: result.failures > 0 ? "destructive" : "default",
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-medium
            file:bg-primary file:text-primary-foreground
            hover:file:bg-primary/90"
        />
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
          className="flex items-center gap-2"
        >
          {isUploading ? (
            <>Processing</>
          ) : (
            <>
              <Upload size={16} />
              Upload
            </>
          )}
        </Button>
      </div>

      {selectedFile && (
        <div className="text-sm text-muted-foreground">
          Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-yellow-500" />
          CSV Format Requirements
        </h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>The first row must contain headers</li>
          <li>Required columns: IMEI No., Registration No., Chassis No., Engine No.</li>
          <li>IMEI No. must be exactly 15 digits</li>
          <li>You can download a template from the "Download" button on the vehicles page</li>
        </ul>
      </div>
    </div>
  );
}
