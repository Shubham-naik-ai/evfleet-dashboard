
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverLicenseExpiryWidgetProps {
  expiryData: {
    "7 days": number;
    "30 days": number;
    "60 days": number;
    "90 days": number;
  };
  className?: string;
}

const DriverLicenseExpiryWidget: React.FC<DriverLicenseExpiryWidgetProps> = ({
  expiryData,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            Driver License Expiry
          </CardTitle>
          <div className="p-2 rounded-md bg-pink-100 text-pink-700">
            <IdCard className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(expiryData).map(([period, count]) => (
            <div key={period} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    period === "7 days"
                      ? "bg-red-500"
                      : period === "30 days"
                      ? "bg-orange-500"
                      : period === "60 days"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  )}
                />
                <span className="text-sm text-muted-foreground">
                  Due within {period}
                </span>
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  period === "7 days"
                    ? "text-red-600"
                    : period === "30 days"
                    ? "text-orange-600"
                    : period === "60 days"
                    ? "text-yellow-600"
                    : "text-green-600"
                )}
              >
                {count} drivers
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border/30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Total upcoming
            </span>
            <span className="text-sm font-bold">
              {Object.values(expiryData).reduce((acc, curr) => acc + curr, 0)} drivers
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverLicenseExpiryWidget;
