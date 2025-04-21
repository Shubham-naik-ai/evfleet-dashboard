
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CO2EmissionCardProps {
  value?: number;
  change?: number; // positive for reduction, negative for increase
  className?: string;
}

const CO2EmissionCard: React.FC<CO2EmissionCardProps> = ({
  value = 72893,
  change = 4.6,
  className,
}) => {
  const positiveChange = change >= 0;
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex flex-col justify-between p-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              CO₂ Emission Reduction
            </h3>
            <p className="text-2xl font-semibold mt-1">
              {value.toLocaleString()} kg
            </p>
          </div>
          <div
            className={cn(
              "p-2 rounded-md",
              positiveChange
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {positiveChange ? (
              <ArrowDown className="h-5 w-5" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
          </div>
        </div>
        <p
          className={cn(
            "text-xs mt-2",
            positiveChange ? "text-green-500" : "text-red-500"
          )}
        >
          {positiveChange ? "↓" : "↑"} {Math.abs(change)}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default CO2EmissionCard;
