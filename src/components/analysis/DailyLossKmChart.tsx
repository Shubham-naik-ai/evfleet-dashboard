
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for daily loss kilometers
const data = [
  { date: "April 1", lossKM: 3540 },
  { date: "April 2", lossKM: 4120 },
  { date: "April 3", lossKM: 3210 },
  { date: "April 4", lossKM: 2780 },
  { date: "April 5", lossKM: 1940 },
  { date: "April 6", lossKM: 2340 },
  { date: "April 7", lossKM: 3450 },
  { date: "April 8", lossKM: 4230 },
  { date: "April 9", lossKM: 3980 },
  { date: "April 10", lossKM: 3120 },
  { date: "April 11", lossKM: 2870 },
  { date: "April 12", lossKM: 2140 },
  { date: "April 13", lossKM: 1980 },
  { date: "April 14", lossKM: 2540 },
  { date: "April 15", lossKM: 3650 },
  { date: "April 16", lossKM: 4320 },
  { date: "April 17", lossKM: 3740 },
  { date: "April 18", lossKM: 3120 },
  { date: "April 19", lossKM: 2650 },
  { date: "April 20", lossKM: 2140 },
  { date: "April 21", lossKM: 2870 },
  { date: "April 22", lossKM: 3450 },
  { date: "April 23", lossKM: 4230 },
  { date: "April 24", lossKM: 3870 },
  { date: "April 25", lossKM: 3320 },
  { date: "April 26", lossKM: 2740 },
  { date: "April 27", lossKM: 2150 },
  { date: "April 28", lossKM: 3240 },
  { date: "April 29", lossKM: 3760 },
  { date: "April 30", lossKM: 4120 },
];

// Chart configuration
const chartConfig = {
  lossKM: {
    label: "Loss KM",
    color: "#EC4899", // Pink
  },
};

export const DailyLossKmChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
      >
        <defs>
          <linearGradient id="colorLossKM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          angle={-45}
          textAnchor="end"
          height={60}
          interval={4}
        />
        <YAxis 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="lossKM"
          stroke="#EC4899"
          fillOpacity={1}
          fill="url(#colorLossKM)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
