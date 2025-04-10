
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KilometerCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export const KilometerCard: React.FC<KilometerCardProps> = ({ title, value, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className={cn("text-2xl font-semibold mt-1")}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </CardContent>
    </Card>
  );
};
