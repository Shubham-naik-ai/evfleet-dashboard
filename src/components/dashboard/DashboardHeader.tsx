
import { Card } from "@/components/ui/card";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardHeader;
