
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

// Sample data matching the screenshot
const data = [
  { date: "Dec 1", schKM: 65000, actKM: 59000, lossKM: 3500 },
  { date: "Dec 2", schKM: 65000, actKM: 61000, lossKM: 4000 },
  { date: "Dec 3", schKM: 65000, actKM: 63000, lossKM: 2000 },
  { date: "Dec 4", schKM: 65000, actKM: 62000, lossKM: 3000 },
  { date: "Dec 5", schKM: 65000, actKM: 61000, lossKM: 4000 },
  { date: "Dec 6", schKM: 65000, actKM: 60000, lossKM: 5000 },
  { date: "Dec 7", schKM: 65000, actKM: 61000, lossKM: 4000 },
  { date: "Dec 8", schKM: 65000, actKM: 59000, lossKM: 6000 },
  { date: "Dec 9", schKM: 65000, actKM: 60000, lossKM: 5000 },
  { date: "Dec 10", schKM: 65000, actKM: 62000, lossKM: 3000 },
  { date: "Dec 11", schKM: 65000, actKM: 61000, lossKM: 4000 },
  { date: "Dec 12", schKM: 65000, actKM: 59000, lossKM: 6000 },
  { date: "Dec 13", schKM: 65000, actKM: 62000, lossKM: 3000 },
  { date: "Dec 14", schKM: 65000, actKM: 60000, lossKM: 5000 },
  { date: "Dec 15", schKM: 65000, actKM: 59000, lossKM: 6000 },
  { date: "Dec 16", schKM: 65000, actKM: 61000, lossKM: 4000 },
  { date: "Dec 17", schKM: 65000, actKM: 60000, lossKM: 5000 },
  { date: "Dec 18", schKM: 65000, actKM: 59000, lossKM: 6000 },
  { date: "Dec 19", schKM: 65000, actKM: 63000, lossKM: 2000 },
  { date: "Dec 20", schKM: 65000, actKM: 61000, lossKM: 4000 },
];

// Chart configuration
const chartConfig = {
  schKM: { 
    label: "Scheduled KM",
    color: "#8B5CF6", // Purple
  },
  actKM: { 
    label: "Actual KM",
    color: "#0EA5E9", // Blue
  },
  lossKM: { 
    label: "Loss KM",
    color: "#EC4899", // Pink
  },
};

export const DailyKilometerChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 35 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          dy={10}
        />
        <YAxis 
          tickFormatter={(value) => `${value/1000}K`} 
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          dx={-10}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            fontSize: 12,
          }}
        />
        <Bar dataKey="schKM" fill="#8B5CF6" name="Sch. KM" />
        <Bar dataKey="actKM" fill="#0EA5E9" name="Act. KM" />
        <Bar dataKey="lossKM" fill="#EC4899" name="Loss KM" />
      </BarChart>
    </ChartContainer>
  );
};
