
import React from "react";
import { ChevronRight } from "lucide-react";

// Sample data for routes loss kilometers
const routeData = [
  { route: "PUNE STATION TO BHOSARI", scheduled: 15240, operated: 7820, loss: 7420, lossPercent: 48.7 },
  { route: "NIGDI TO KATRAJ", scheduled: 12450, operated: 8340, loss: 4110, lossPercent: 33.0 },
  { route: "MANJALPATTI GAON TO KATRAJ", scheduled: 9840, operated: 6120, loss: 3720, lossPercent: 37.8 },
  { route: "HADAPSAR TO SANGAMWADI", scheduled: 8750, operated: 5640, loss: 3110, lossPercent: 35.5 },
  { route: "BANER-BALEWADI-MANJARI", scheduled: 7540, operated: 4650, loss: 2890, lossPercent: 38.3 },
  { route: "NEHRUNAGAR TO PUNE STATION", scheduled: 6820, operated: 4340, loss: 2480, lossPercent: 36.4 },
  { route: "PIMPRI TO SWARGATE", scheduled: 8950, operated: 6780, loss: 2170, lossPercent: 24.2 },
  { route: "WARJE TO WAGHOLI", scheduled: 5760, operated: 3820, loss: 1940, lossPercent: 33.7 },
  { route: "AUNDH TO KATRAJ", scheduled: 4890, operated: 3240, loss: 1650, lossPercent: 33.7 },
  { route: "KOTHRUD TO VIMAN NAGAR", scheduled: 4320, operated: 2970, loss: 1350, lossPercent: 31.3 },
];

export const RouteLossKmTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="px-4 py-3 text-left font-medium">Route Name</th>
            <th className="px-4 py-3 text-right font-medium">Scheduled KM</th>
            <th className="px-4 py-3 text-right font-medium">Operated KM</th>
            <th className="px-4 py-3 text-right font-medium">Loss KM</th>
            <th className="px-4 py-3 text-right font-medium">Loss %</th>
            <th className="px-2 py-3 text-center font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {routeData.map((route, index) => (
            <tr key={index} className="border-b border-border/40 hover:bg-muted/20">
              <td className="px-4 py-2.5 font-medium">{route.route}</td>
              <td className="px-4 py-2.5 text-right">{route.scheduled.toLocaleString()}</td>
              <td className="px-4 py-2.5 text-right">{route.operated.toLocaleString()}</td>
              <td className="px-4 py-2.5 text-right text-red-500">{route.loss.toLocaleString()}</td>
              <td className="px-4 py-2.5 text-right text-red-500">{route.lossPercent.toFixed(1)}%</td>
              <td className="px-2 py-2.5 text-center">
                <button className="p-1 rounded-full hover:bg-muted transition-colors">
                  <ChevronRight size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
