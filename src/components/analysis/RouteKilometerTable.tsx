
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for the table
const routeData = [
  { id: 1, route: "PUNE STATION TO BHOSARI", lossKM: 8020.8 },
  { id: 2, route: "PUNE STATION TO BHOSARI - KIWALE", lossKM: 8388.6 },
  { id: 3, route: "BANER-BALEWADI-MANJARI F3", lossKM: 7458.2 },
  { id: 4, route: "NIGDI TO PUMPRI F3", lossKM: 6098.2 },
  { id: 5, route: "NIGDI TO KATRAJ", lossKM: 5819.1 },
  { id: 6, route: "BHAKUMDANE GAON TO KATRAJ", lossKM: 5321.4 },
  { id: 7, route: "AMRDI RAILWAY STATION-KATRAJ", lossKM: 4113.2 },
  { id: 8, route: "BANER-BALEWADI-MANJARI-FL", lossKM: 3598.6 },
  { id: 9, route: "NIGDI TO PUNE STATION", lossKM: 3402.7 },
  { id: 10, route: "PUNE STATION TO YERWADA", lossKM: 3403.8 },
];

export const RouteKilometerTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="px-4 py-3 text-left font-medium w-10">#</th>
            <th className="px-4 py-3 text-left font-medium">Route Details</th>
            <th className="px-4 py-3 text-right font-medium">Loss KM</th>
          </tr>
        </thead>
        <tbody>
          {routeData.map((item) => (
            <tr key={item.id} className="border-b border-border/40">
              <td className="px-4 py-2.5 text-muted-foreground">{item.id}</td>
              <td className="px-4 py-2.5">{item.route}</td>
              <td className="px-4 py-2.5 text-right">{item.lossKM.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
        <span>1 - 10 / 101</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
