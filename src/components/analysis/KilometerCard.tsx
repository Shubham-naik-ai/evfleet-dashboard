
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Truck, Route, AlertTriangle, Calendar, TrendingDown, Gauge, Shield, Navigation } from "lucide-react";

interface KilometerCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: "truck" | "route" | "alert" | "calendar" | "trending" | "gauge" | "shield" | "navigation";
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const KilometerCard: React.FC<KilometerCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend = "neutral",
  className 
}) => {
  const getIcon = () => {
    switch (icon) {
      case "truck": return <Truck className="h-5 w-5" />;
      case "route": return <Route className="h-5 w-5" />;
      case "alert": return <AlertTriangle className="h-5 w-5" />;
      case "calendar": return <Calendar className="h-5 w-5" />;
      case "trending": return <TrendingDown className="h-5 w-5" />;
      case "gauge": return <Gauge className="h-5 w-5" />;
      case "shield": return <Shield className="h-5 w-5" />;
      case "navigation": return <Navigation className="h-5 w-5" />;
      default: return null;
    }
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className={cn("text-2xl font-semibold mt-1")}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {change && (
              <p className={cn("text-xs mt-1", 
                trend === "up" ? "text-green-500" : 
                trend === "down" ? "text-red-500" : 
                "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn("p-2 rounded-md", 
              icon === "truck" ? "bg-blue-100 text-blue-600" : 
              icon === "route" ? "bg-purple-100 text-purple-600" : 
              icon === "alert" ? "bg-red-100 text-red-600" : 
              icon === "calendar" ? "bg-green-100 text-green-600" :
              icon === "trending" ? "bg-amber-100 text-amber-600" :
              icon === "gauge" ? "bg-cyan-100 text-cyan-600" :
              icon === "shield" ? "bg-purple-100 text-purple-600" :
              icon === "navigation" ? "bg-emerald-100 text-emerald-600" :
              "bg-slate-100 text-slate-600"
            )}>
              {getIcon()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
