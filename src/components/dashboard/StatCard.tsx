import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

const StatCard = ({ title, value, icon, colorClass = "stat-card-blue", trend }: StatCardProps) => {
  return (
    <Card className={`${colorClass}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <p className={`text-sm ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <div className="p-2 bg-background/80 backdrop-blur-sm rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
