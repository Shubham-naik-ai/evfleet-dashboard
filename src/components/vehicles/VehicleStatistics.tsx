
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Vehicle, VehicleStatus } from '@/types/vehicle';

interface VehicleStatisticsProps {
  vehicles: Vehicle[];
}

const VehicleStatistics: React.FC<VehicleStatisticsProps> = ({ vehicles }) => {
  // Calculate status distribution
  const statusData = useMemo(() => {
    const statusCounts: Record<VehicleStatus, number> = {
      'ACTIVE': 0,
      'INACTIVE': 0,
      'MAINTENANCE': 0,
      'CHARGING': 0
    };
    
    vehicles.forEach(vehicle => {
      statusCounts[vehicle.status]++;
    });
    
    const colors = {
      'ACTIVE': '#10B981', // green
      'INACTIVE': '#6B7280', // gray
      'MAINTENANCE': '#F59E0B', // amber
      'CHARGING': '#0EA5E9', // blue
    };
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: colors[status as VehicleStatus]
    }));
  }, [vehicles]);

  // Calculate depot distribution
  const depotData = useMemo(() => {
    const depotCounts: Record<string, number> = {};
    
    vehicles.forEach(vehicle => {
      depotCounts[vehicle.depot] = (depotCounts[vehicle.depot] || 0) + 1;
    });
    
    // Get top 5 depots
    return Object.entries(depotCounts)
      .map(([depot, count]) => ({ name: depot, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [vehicles]);

  // Calculate battery SoC distribution
  const socData = useMemo(() => {
    const socRanges = [
      { range: '0-25%', count: 0 },
      { range: '26-50%', count: 0 },
      { range: '51-75%', count: 0 },
      { range: '76-100%', count: 0 },
      { range: 'Unknown', count: 0 }
    ];
    
    vehicles.forEach(vehicle => {
      if (vehicle.soc === null) {
        socRanges[4].count++;
      } else if (vehicle.soc <= 25) {
        socRanges[0].count++;
      } else if (vehicle.soc <= 50) {
        socRanges[1].count++;
      } else if (vehicle.soc <= 75) {
        socRanges[2].count++;
      } else {
        socRanges[3].count++;
      }
    });
    
    const colors = ['#EF4444', '#F59E0B', '#FBBF24', '#10B981', '#6B7280'];
    
    return socRanges.map((item, index) => ({
      ...item,
      color: colors[index]
    }));
  }, [vehicles]);

  // Chart configurations
  const statusConfig = {
    status: {
      label: "Vehicle Status",
      color: "#0EA5E9", // Blue
    }
  };

  const depotConfig = {
    depot: {
      label: "Depot Distribution",
      color: "#8B5CF6", // Purple
    }
  };

  const socConfig = {
    soc: {
      label: "Battery Status",
      color: "#10B981", // Green
    }
  };

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Vehicle Status Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Vehicle Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Depot Distribution Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Top 5 Depots</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={depotConfig} className="h-[200px]">
            <BarChart
              data={depotData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 10 }} 
                width={80}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Battery SoC Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Battery Status (SoC)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={socConfig} className="h-[200px]">
            <BarChart
              data={socData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" name="Vehicles">
                {socData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleStatistics;
