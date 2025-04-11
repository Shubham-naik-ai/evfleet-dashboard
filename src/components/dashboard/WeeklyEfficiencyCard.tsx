
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeeklyEfficiencyCardProps {
  data: {
    day: string;
    efficiency: number;
  }[];
}

const WeeklyEfficiencyCard = ({ data }: WeeklyEfficiencyCardProps) => {
  // Calculate average efficiency
  const avgEfficiency = Math.round(
    data.reduce((sum, item) => sum + item.efficiency, 0) / data.length
  );

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Weekly Fleet Efficiency</CardTitle>
          <div className="bg-purple-100 p-2 rounded-md">
            <Award className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Average: {avgEfficiency}%</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Efficiency</span>
          </div>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Efficiency']}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Bar 
                dataKey="efficiency" 
                fill="#9333EA" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-purple-50 rounded-md">
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Best day: </span>
            <span className="ml-auto">
              {data.reduce((max, item) => item.efficiency > max.efficiency ? item : max).day} 
              ({data.reduce((max, item) => item.efficiency > max.efficiency ? item : max).efficiency}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyEfficiencyCard;
