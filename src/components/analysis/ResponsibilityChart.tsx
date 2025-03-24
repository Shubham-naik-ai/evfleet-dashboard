
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for responsibilities
const data = [
  { name: "Operations", value: 58427.1 },
  { name: "Service", value: 35384.45 },
  { name: "Authority", value: 15707.9 },
  { name: "Operator", value: 10207.4 },
];

// Colors for the bars
const colors = ["#0EA5E9", "#10B981", "#8B5CF6", "#F59E0B"];

// Chart configuration
const chartConfig = {
  value: {
    label: "Loss KM",
    color: "#0EA5E9", // Blue
  },
};

export const ResponsibilityChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[335px] w-full">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
        />
        <YAxis 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="#0EA5E9" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <LabelList dataKey="value" position="top" fill="#64748B" fontSize={10} formatter={(value: number) => value.toFixed(1)} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
