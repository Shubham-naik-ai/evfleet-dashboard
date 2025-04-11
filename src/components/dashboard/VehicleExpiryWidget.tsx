
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, File, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleExpiryWidgetProps {
  title: string;
  icon: "calendar" | "file" | "clock";
  expiryData: {
    "7 days": number;
    "30 days": number;
    "60 days": number;
    "90 days": number;
  };
  className?: string;
}

export const VehicleExpiryWidget: React.FC<VehicleExpiryWidgetProps> = ({
  title,
  icon,
  expiryData,
  className
}) => {
  const getIcon = () => {
    switch (icon) {
      case "calendar": return <Calendar className="h-5 w-5" />;
      case "file": return <File className="h-5 w-5" />;
      case "clock": return <Clock className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getIconColorClass = () => {
    switch (icon) {
      case "calendar": return "bg-blue-100 text-blue-600";
      case "file": return "bg-purple-100 text-purple-600";
      case "clock": return "bg-green-100 text-green-600";
      default: return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className={cn("p-2 rounded-md", getIconColorClass())}>
            {getIcon()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(expiryData).map(([period, count]) => (
            <div key={period} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  period === "7 days" ? "bg-red-500" :
                  period === "30 days" ? "bg-orange-500" :
                  period === "60 days" ? "bg-yellow-500" :
                  "bg-green-500"
                )} />
                <span className="text-sm text-muted-foreground">Due within {period}</span>
              </div>
              <span className={cn(
                "text-sm font-medium",
                period === "7 days" ? "text-red-600" :
                period === "30 days" ? "text-orange-600" :
                period === "60 days" ? "text-yellow-600" :
                "text-green-600"
              )}>
                {count} vehicles
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border/30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Total upcoming</span>
            <span className="text-sm font-bold">
              {Object.values(expiryData).reduce((acc, curr) => acc + curr, 0)} vehicles
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
