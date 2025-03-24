
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "maintenance" | "route" | "depot" | "system";
}

interface ActivityTimelineProps {
  items: TimelineItem[];
}

const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative flex-none">
                <div
                  className={cn("w-2 h-2 rounded-full mt-2", 
                    item.type === "maintenance" ? "bg-ev-yellow" : 
                    item.type === "route" ? "bg-ev-blue" : 
                    item.type === "depot" ? "bg-ev-purple" : 
                    "bg-ev-green"
                  )}
                />
                {items.indexOf(item) < items.length - 1 && (
                  <div className="absolute top-4 bottom-0 left-1 w-px -translate-x-1/2 bg-border" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                <p className="text-2xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
