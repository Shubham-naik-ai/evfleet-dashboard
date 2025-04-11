
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for daily distance
const data = [
  { date: "Apr 5", current: 47500, previous: 46800 },
  { date: "Apr 6", current: 48200, previous: 47100 },
  { date: "Apr 7", current: 46800, previous: 45900 },
  { date: "Apr 8", current: 49100, previous: 47600 },
  { date: "Apr 9", current: 48700, previous: 48200 },
  { date: "Apr 10", current: 49500, previous: 48300 },
  { date: "Apr 11", current: 48560, previous: 47900 }
];

// Chart configuration
const chartConfig = {
  current: {
    label: "Current Week",
    color: "#0EA5E9", // Blue
  },
  previous: {
    label: "Previous Week",
    color: "#94A3B8", // Gray
  },
};

export const DailyDistanceChart = () => {
  // Calculate today's increase percentage
  const todayData = data[data.length - 1];
  const increasePercentage = ((todayData.current - todayData.previous) / todayData.previous * 100).toFixed(1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Daily Distance Comparison</CardTitle>
          <div className="bg-blue-100 p-2 rounded-md">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Today's Distance</p>
            <p className="text-2xl font-semibold">{todayData.current.toLocaleString()} km</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">vs. Last Week</p>
            <p className={`text-sm font-medium ${parseFloat(increasePercentage) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(increasePercentage) > 0 ? '+' : ''}{increasePercentage}%
            </p>
          </div>
        </div>
        
        <div className="h-[230px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={{ r: 3 }}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
