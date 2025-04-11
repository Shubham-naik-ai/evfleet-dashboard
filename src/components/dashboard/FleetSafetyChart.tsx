
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for safety incidents
const data = [
  { name: "Week 1", overspeeding: 8, harshAccel: 5, harshBraking: 7 },
  { name: "Week 2", overspeeding: 6, harshAccel: 4, harshBraking: 5 },
  { name: "Week 3", overspeeding: 5, harshAccel: 3, harshBraking: 4 },
  { name: "Week 4", overspeeding: 4, harshAccel: 3, harshBraking: 2 },
];

// Chart configuration
const chartConfig = {
  overspeeding: {
    label: "Overspeeding",
    color: "#EF4444", // Red
  },
  harshAccel: {
    label: "Harsh Acceleration",
    color: "#F59E0B", // Amber
  },
  harshBraking: {
    label: "Harsh Braking",
    color: "#8B5CF6", // Purple
  },
};

export const FleetSafetyChart = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Fleet Safety Incidents</CardTitle>
          <div className="bg-purple-100 p-2 rounded-md">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
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
              <Legend />
              <Bar dataKey="overspeeding" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="harshAccel" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="harshBraking" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
