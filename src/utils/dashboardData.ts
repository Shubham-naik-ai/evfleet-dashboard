
export const getProjectData = (project: string, depot: string) => {
  // Base multipliers for different projects to simulate different data
  const projectMultipliers: Record<string, number> = {
    "PMPML": 1.0,
    "SILVASA": 0.3,
    "DEHRADUN": 0.4,
    "KSRTC": 0.8,
    "GSRTC": 0.7,
    "NAGPUR": 0.5,
    "APSRTC": 0.9,
    "SURAT": 0.6,
    "TMTU": 0.4,
    "KTC - GOA": 0.2,
    "IDR - GOA": 0.1,
    "TGSRTC": 0.8,
    "BEST": 1.2,
    "MSRTC 100": 0.1,
    "MSRTC 5150": 2.2
  };

  const multiplier = projectMultipliers[project] || 1.0;

  const baseData = {
    totalVehicles: Math.round(2295 * multiplier),
    fleetStatusData: [
      { name: "In Depot", value: Math.round(1147 * multiplier), color: "#0EA5E9" },
      { name: "On Route", value: Math.round(1148 * multiplier), color: "#10B981" },
    ],
    vehicleStatusData: [
      { name: "Running", value: Math.round(1606 * multiplier), color: "#10B981" },
      { name: "Idle", value: Math.round(454 * multiplier), color: "#0EA5E9" },
      { name: "Stop", value: Math.round(235 * multiplier), color: "#F59E0B" },
    ],
    vtsDeviceData: [
      { name: "Active", value: Math.round(1994 * multiplier), color: "#10B981" },
      { name: "Inactive", value: Math.round(301 * multiplier), color: "#EF4444" },
    ],
    idleVehiclesData: [
      { name: "0-1 Hrs", value: Math.round(128 * multiplier), color: "#10B981" },
      { name: "1-2 Hrs", value: Math.round(146 * multiplier), color: "#0EA5E9" },
      { name: "2-5 Hrs", value: Math.round(183 * multiplier), color: "#F59E0B" },
      { name: "> 5 Hrs", value: Math.round(97 * multiplier), color: "#EF4444" },
    ],
    stoppedVehiclesData: [
      { name: "0-1 Hrs", value: Math.round(45 * multiplier), color: "#10B981" },
      { name: "1-2 Hrs", value: Math.round(32 * multiplier), color: "#0EA5E9" },
      { name: "2-5 Hrs", value: Math.round(43 * multiplier), color: "#F59E0B" },
      { name: "> 5 Hrs", value: Math.round(30 * multiplier), color: "#EF4444" },
    ],
    emergencyAlerts: [
      { type: "Overspeeding", count: Math.round(23 * multiplier), color: "#EF4444" },
      { type: "Harsh Acceleration", count: Math.round(15 * multiplier), color: "#F59E0B" },
      { type: "Harsh Braking", count: Math.round(18 * multiplier), color: "#0EA5E9" },
      { type: "SOS Alerts", count: Math.round(12 * multiplier), color: "#8B5CF6" },
    ],
    totalKilometers: Math.round(331518824 * multiplier).toLocaleString(),
    monthlyDistance: Math.round(2845672 * multiplier).toLocaleString(),
    avgDailyDistance: Math.round(48560 * multiplier).toLocaleString(),
    avgKmsPerCharge: Math.round(287 * multiplier),
    co2Emission: Math.round(72893 * multiplier),
  };

  return baseData;
};
