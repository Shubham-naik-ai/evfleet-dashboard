
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Clock } from "lucide-react";

interface IdleVehiclesChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const IdleVehiclesChart = ({ data }: IdleVehiclesChartProps) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Idle Vehicles</CardTitle>
          <div className="bg-blue-100 p-2 rounded-md">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} vehicles`, '']}
                contentStyle={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => (
                  <span className="text-xs font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Total count in the center of donut */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-2xl font-bold">{total}</span>
            <p className="text-xs text-muted-foreground">Total Idle</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs">{item.name}</span>
              <span className="text-xs font-medium ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdleVehiclesChart;
