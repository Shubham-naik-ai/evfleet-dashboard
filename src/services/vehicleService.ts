
import { supabase } from "@/integrations/supabase/client";
import { Vehicle, VehicleFormInput, VehicleHistory } from "@/types/vehicle";

// Use a typed wrapper for Supabase client to avoid TypeScript errors
const typedSupabase = supabase as any;

// Get all vehicles
export const getAllVehicles = async () => {
  const { data, error } = await typedSupabase
    .from('vehicles')
    .select('*')
    .order('vehicle_id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle[];
};

// Get active vehicles (for live vehicles page)
export const getLiveVehicles = async () => {
  const { data, error } = await typedSupabase
    .from('vehicles')
    .select('*')
    .eq('status', 'ACTIVE')
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle[];
};

// Get vehicle by id
export const getVehicleById = async (id: number) => {
  const { data, error } = await typedSupabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Vehicle;
};

// Create a new vehicle
export const createVehicle = async (vehicle: VehicleFormInput) => {
  const { data, error } = await typedSupabase
    .from('vehicles')
    .insert([vehicle])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Vehicle;
};

// Update a vehicle
export const updateVehicle = async (id: number, vehicle: Partial<VehicleFormInput>) => {
  const { data, error } = await typedSupabase
    .from('vehicles')
    .update(vehicle)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Vehicle;
};

// Delete a vehicle
export const deleteVehicle = async (id: number) => {
  const { error } = await typedSupabase
    .from('vehicles')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

// Get vehicle history
export const getVehicleHistory = async (vehicleId: number) => {
  const { data, error } = await typedSupabase
    .from('vehicle_history')
    .select('*')
    .eq('vehicle_id', vehicleId)
    .order('timestamp', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as VehicleHistory[];
};

// Add vehicle history entry
export const addVehicleHistoryEntry = async (historyEntry: Omit<VehicleHistory, 'id' | 'timestamp'>) => {
  const { data, error } = await typedSupabase
    .from('vehicle_history')
    .insert([historyEntry])
    .select();

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
