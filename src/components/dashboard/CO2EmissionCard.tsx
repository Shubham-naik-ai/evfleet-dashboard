
import { LeafyGreen } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const CO2EmissionCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">CO2 Emission Reduction</p>
            <h3 className="text-2xl font-bold tracking-tight">4,521 tons</h3>
            <p className="text-sm text-green-500">↑ 12.3% from last month</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <LeafyGreen className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CO2EmissionCard;
