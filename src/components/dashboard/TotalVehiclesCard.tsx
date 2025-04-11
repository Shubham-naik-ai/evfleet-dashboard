
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus } from "lucide-react";

interface VehicleCount {
  running: number;
  active: number;
  stopped: number;
}

interface TotalVehiclesCardProps {
  counts: VehicleCount;
}

const TotalVehiclesCard = ({ counts }: TotalVehiclesCardProps) => {
  const total = counts.running + counts.active + counts.stopped;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Total Vehicles</CardTitle>
          <div className="bg-green-100 p-2 rounded-md">
            <Bus className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-3xl font-bold">{total}</span>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex flex-col bg-green-50 p-3 rounded-md">
              <span className="text-xs text-muted-foreground">Running</span>
              <span className="text-lg font-semibold text-green-600">{counts.running}</span>
            </div>
            <div className="flex flex-col bg-blue-50 p-3 rounded-md">
              <span className="text-xs text-muted-foreground">Active</span>
              <span className="text-lg font-semibold text-blue-600">{counts.active}</span>
            </div>
            <div className="flex flex-col bg-amber-50 p-3 rounded-md">
              <span className="text-xs text-muted-foreground">Stopped</span>
              <span className="text-lg font-semibold text-amber-600">{counts.stopped}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalVehiclesCard;
