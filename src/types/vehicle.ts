
export type VehicleStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'CHARGING';

export interface Vehicle {
  id: number;
  vehicle_id: string;
  depot: string;
  odo_reading: number | null;
  soc: number | null;
  imei_no: string;
  registration_no: string;
  chassis_no: string;
  engine_no: string;
  device_make: string | null;
  last_heartbeat: string | null;
  status: VehicleStatus;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export interface VehicleHistory {
  id: number;
  vehicle_id: number;
  status: VehicleStatus;
  location_lat: number | null;
  location_lng: number | null;
  odo_reading: number | null;
  soc: number | null;
  timestamp: string;
  details: Record<string, any> | null;
}

export interface VehicleFormInput {
  vehicle_id: string;
  depot: string;
  odo_reading: number | null;
  soc: number | null;
  imei_no: string;
  registration_no: string;
  chassis_no: string;
  engine_no: string;
  device_make: string;
  status: VehicleStatus;
  remarks: string;
}
