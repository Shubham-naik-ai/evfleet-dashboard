
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface FleetStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const FleetStatusChart = ({ data }: FleetStatusChartProps) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Fleet Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52">
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
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value, entry, index) => (
                  <span className="text-xs font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-muted-foreground">{item.name}</span>
              <span className="text-xs font-medium ml-auto">{((item.value / total) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FleetStatusChart;
