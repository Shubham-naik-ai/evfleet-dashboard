
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for monthly loss
const data = [
  { month: "Apr 2024", lossKM: 87254 },
  { month: "May 2024", lossKM: 95421 },
  { month: "Jun 2024", lossKM: 103567 },
  { month: "Jul 2024", lossKM: 89756 },
  { month: "Aug 2024", lossKM: 92345 },
  { month: "Sep 2024", lossKM: 88523 },
  { month: "Oct 2024", lossKM: 94215 },
  { month: "Nov 2024", lossKM: 97845 },
  { month: "Dec 2024", lossKM: 105342 },
  { month: "Jan 2025", lossKM: 112567 },
  { month: "Feb 2025", lossKM: 106234 },
  { month: "Mar 2025", lossKM: 110127 },
  { month: "Apr 2025", lossKM: 0 }, // Current month with no data yet
];

// Chart configuration
const chartConfig = {
  lossKM: {
    label: "Loss KM",
    color: "#0EA5E9", // Blue
  },
};

export const MonthlyLossChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          angle={-45}
          textAnchor="end"
          dy={10}
        />
        <YAxis 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="lossKM" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
