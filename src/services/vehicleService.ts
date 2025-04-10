
import { supabase } from "@/integrations/supabase/client";
import { Vehicle, VehicleFormInput, VehicleHistory } from "@/types/vehicle";

// Get all vehicles
export const getAllVehicles = async () => {
  // Using type assertion to bypass TypeScript errors with Supabase tables
  const { data, error } = await (supabase
    .from('vehicles')
    .select('*')
    .order('vehicle_id', { ascending: true }) as any);

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle[];
};

// Get active vehicles (for live vehicles page)
export const getLiveVehicles = async () => {
  const { data, error } = await (supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'ACTIVE')
    .order('updated_at', { ascending: false }) as any);

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle[];
};

// Get vehicle by id
export const getVehicleById = async (id: number) => {
  const { data, error } = await (supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single() as any);

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle;
};

// Create a new vehicle
export const createVehicle = async (vehicle: VehicleFormInput) => {
  const { data, error } = await (supabase
    .from('vehicles')
    .insert([vehicle as any])
    .select() as any);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Vehicle;
};

// Update a vehicle
export const updateVehicle = async (id: number, vehicle: Partial<VehicleFormInput>) => {
  const { data, error } = await (supabase
    .from('vehicles')
    .update(vehicle as any)
    .eq('id', id)
    .select() as any);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Vehicle;
};

// Delete a vehicle
export const deleteVehicle = async (id: number) => {
  const { error } = await (supabase
    .from('vehicles')
    .delete()
    .eq('id', id) as any);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

// Get vehicle history
export const getVehicleHistory = async (vehicleId: number) => {
  const { data, error } = await (supabase
    .from('vehicle_history')
    .select('*')
    .eq('vehicle_id', vehicleId)
    .order('timestamp', { ascending: false }) as any);

  if (error) {
    throw new Error(error.message);
  }

  return data as VehicleHistory[];
};

// Add vehicle history entry
export const addVehicleHistoryEntry = async (historyEntry: Omit<VehicleHistory, 'id' | 'timestamp'>) => {
  const { data, error } = await (supabase
    .from('vehicle_history')
    .insert([historyEntry as any])
    .select() as any);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as VehicleHistory;
};

// Download vehicles data as CSV
export const downloadVehiclesCSV = async () => {
  const vehicles = await getAllVehicles();
  
  // Create CSV content
  const headers = ['Vehicle ID', 'Depot', 'ODO Reading', 'SoC', 'IMEI No.', 'Registration No.', 
    'Chassis No.', 'Engine No.', 'Device Make', 'Last Heartbeat', 'Status', 'Remarks'];
  
  let csvContent = headers.join(',') + '\n';
  
  vehicles.forEach(vehicle => {
    const row = [
      vehicle.vehicle_id,
      vehicle.depot,
      vehicle.odo_reading || '',
      vehicle.soc || '',
      vehicle.imei_no,
      vehicle.registration_no,
      vehicle.chassis_no,
      vehicle.engine_no,
      vehicle.device_make || '',
      vehicle.last_heartbeat || '',
      vehicle.status,
      vehicle.remarks || ''
    ].map(value => `"${String(value).replace(/"/g, '""')}"`);
    
    csvContent += row.join(',') + '\n';
  });
  
  return csvContent;
};

// Validate vehicle data
export const validateVehicle = (data: Partial<VehicleFormInput>): string[] => {
  const errors: string[] = [];
  
  // Check mandatory fields
  if (!data.imei_no) errors.push('IMEI No. is required');
  if (!data.chassis_no) errors.push('Chassis No. is required');
  if (!data.engine_no) errors.push('Engine No. is required');
  if (!data.registration_no) errors.push('Registration No. is required');
  
  // Validate IMEI format (15 digits)
  if (data.imei_no && !/^\d{15}$/.test(data.imei_no)) {
    errors.push('IMEI No. must be exactly 15 digits');
  }
  
  return errors;
};
