
import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface KilometerCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export const KilometerCard = ({
  title,
  value,
  className,
}: KilometerCardProps) => {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <div className="px-4 py-3">
        <h3 className="text-xs font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
};
