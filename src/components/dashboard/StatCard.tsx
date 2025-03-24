
import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
  subStats?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  colorClass = "stat-card-blue",
  subStats,
  className,
}: StatProps) => {
  return (
    <Card className={cn("stat-card", colorClass, "animate-fade-in", className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn("p-2 rounded-md", 
          colorClass === "stat-card-blue" ? "bg-ev-lightBlue text-ev-blue" : 
          colorClass === "stat-card-green" ? "bg-green-100 text-ev-green" : 
          colorClass === "stat-card-red" ? "bg-red-100 text-ev-red" : 
          colorClass === "stat-card-yellow" ? "bg-amber-100 text-ev-yellow" : 
          "bg-purple-100 text-ev-purple"
        )}>
          {icon}
        </div>
      </div>
      
      {subStats && subStats.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border/30 grid gap-y-2">
          {subStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className={cn("text-xs font-medium", 
                stat.color === "green" ? "text-ev-green" : 
                stat.color === "red" ? "text-ev-red" : 
                stat.color === "yellow" ? "text-ev-yellow" : 
                stat.color === "blue" ? "text-ev-blue" : 
                stat.color === "purple" ? "text-ev-purple" : 
                "text-foreground"
              )}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default StatCard;
