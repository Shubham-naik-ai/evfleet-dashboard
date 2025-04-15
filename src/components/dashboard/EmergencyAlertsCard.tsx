
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface AlertData {
  type: string;
  count: number;
  color: string;
}

interface EmergencyAlertsCardProps {
  alerts: AlertData[];
}

const EmergencyAlertsCard = ({ alerts }: EmergencyAlertsCardProps) => {
  const totalAlerts = alerts.reduce((sum, alert) => sum + alert.count, 0);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Emergency Alerts</CardTitle>
          <div className="bg-red-100 p-2 rounded-md">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: alert.color }} />
                  <span className="text-sm font-medium">{alert.type}</span>
                </div>
                <span className="text-sm font-bold">{alert.count}</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(alert.count / totalAlerts) * 100}%`,
                    backgroundColor: alert.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border/30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Total Alerts</span>
            <span className="text-lg font-bold">{totalAlerts}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyAlertsCard;
