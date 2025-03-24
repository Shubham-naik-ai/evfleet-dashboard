
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for routes and reasons
const data = [
  {
    route: "PUNE STATION TO BHOSARI",
    noCharging: 2500,
    heavyTraffic: 1800,
    maintenance: 1200,
    breakdown: 900,
    noConductor: 800,
    driverNotAvailable: 500,
    accident: 200,
    scheduleCancelled: 120,
    accidentRepairing: 0,
    tyrePuncture: 0,
  },
  {
    route: "NIGDI TO KATRAJ",
    noCharging: 1800,
    heavyTraffic: 700,
    maintenance: 900,
    breakdown: 800,
    noConductor: 600,
    driverNotAvailable: 400,
    accident: 300,
    scheduleCancelled: 200,
    accidentRepairing: 100,
    tyrePuncture: 200,
  },
  {
    route: "MANJALPATTI GAON TO KATRAJ",
    noCharging: 1500,
    heavyTraffic: 1000,
    maintenance: 1000,
    breakdown: 600,
    noConductor: 400,
    driverNotAvailable: 300,
    accident: 0,
    scheduleCancelled: 0,
    accidentRepairing: 0,
    tyrePuncture: 0,
  },
  {
    route: "BANER-BALEWADI-MANJARI",
    noCharging: 1200,
    heavyTraffic: 800,
    maintenance: 600,
    breakdown: 400,
    noConductor: 300,
    driverNotAvailable: 200,
    accident: 100,
    scheduleCancelled: 50,
    accidentRepairing: 0,
    tyrePuncture: 0,
  },
];

// Chart configuration
const chartConfig = {
  noCharging: { 
    label: "No Bus Charging",
    color: "#0EA5E9", // Blue
  },
  heavyTraffic: { 
    label: "Heavy Traffic",
    color: "#EC4899", // Pink
  },
  maintenance: { 
    label: "Maintenance",
    color: "#F97316", // Orange
  },
  breakdown: { 
    label: "Breakdown",
    color: "#65A30D", // Green
  },
  noConductor: { 
    label: "No Bus Conductor",
    color: "#EAB308", // Yellow
  },
  driverNotAvailable: { 
    label: "Driver Not available",
    color: "#8B5CF6", // Purple
  },
  accident: { 
    label: "Accident",
    color: "#EF4444", // Red
  },
  scheduleCancelled: { 
    label: "Schedule Cancelled",
    color: "#14B8A6", // Teal
  },
  accidentRepairing: { 
    label: "Accident Repairing",
    color: "#6366F1", // Indigo
  },
  tyrePuncture: { 
    label: "Tyre Puncture",
    color: "#A855F7", // Purple
  },
};

export const LossReasonsPieChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
        barGap={0}
        barCategoryGap="10%"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis 
          type="number"
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
        />
        <YAxis 
          type="category"
          dataKey="route" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          width={160}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend
          wrapperStyle={{
            fontSize: 10,
          }}
          layout="horizontal"
          align="center"
        />
        <Bar dataKey="noCharging" stackId="a" fill="#0EA5E9" />
        <Bar dataKey="heavyTraffic" stackId="a" fill="#EC4899" />
        <Bar dataKey="maintenance" stackId="a" fill="#F97316" />
        <Bar dataKey="breakdown" stackId="a" fill="#65A30D" />
        <Bar dataKey="noConductor" stackId="a" fill="#EAB308" />
        <Bar dataKey="driverNotAvailable" stackId="a" fill="#8B5CF6" />
        <Bar dataKey="accident" stackId="a" fill="#EF4444" />
        <Bar dataKey="scheduleCancelled" stackId="a" fill="#14B8A6" />
        <Bar dataKey="accidentRepairing" stackId="a" fill="#6366F1" />
        <Bar dataKey="tyrePuncture" stackId="a" fill="#A855F7" />
      </BarChart>
    </ChartContainer>
  );
};
