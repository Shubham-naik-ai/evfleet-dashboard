
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
  Cell,
  LabelList,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for loss reasons
const data = [
  { name: "No Bus Charging", value: 25780, percent: "29.2%" },
  { name: "Heavy Traffic", value: 19670, percent: "22.3%" },
  { name: "Maintenance", value: 16218, percent: "18.4%" },
  { name: "Breakdown", value: 11135, percent: "12.6%" },
  { name: "No Bus Conductor", value: 10947, percent: "12.4%" },
  { name: "Driver Not available", value: 4372, percent: "5.0%" },
  { name: "Accident", value: 3445, percent: "3.9%" },
  { name: "Schedule Cancelled", value: 2247, percent: "2.5%" },
  { name: "Accident Repairing", value: 1723, percent: "2.0%" },
  { name: "Tyre Puncture", value: 710, percent: "0.8%" },
];

// Colors for the bars
const colors = [
  "#0EA5E9", // Blue
  "#EC4899", // Pink
  "#F97316", // Orange
  "#65A30D", // Green
  "#EAB308", // Yellow
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#14B8A6", // Teal
  "#6366F1", // Indigo
  "#A855F7", // Purple
];

// Chart configuration
const chartConfig = {
  value: {
    label: "Loss KM",
    color: "#0EA5E9", // Blue
  },
};

export const LossReasonsBarChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[335px] w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 65, left: 130, bottom: 5 }}
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
          dataKey="name" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          width={130}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="#0EA5E9" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <LabelList dataKey="percent" position="right" fill="#64748B" fontSize={10} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
