
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for the bus loss table
const busData = [
  { id: 1, busNo: "MH12NE9391", lossKM: 3127.4 },
  { id: 2, busNo: "MH12NE8576", lossKM: 2949 },
  { id: 3, busNo: "MH12YV8572", lossKM: 1716.55 },
  { id: 4, busNo: "MH12TV1218", lossKM: 1600.9 },
  { id: 5, busNo: "MH12NN5389", lossKM: 1516.5 },
  { id: 6, busNo: "MH12SE4956", lossKM: 1433.1 },
  { id: 7, busNo: "MH12NS5379", lossKM: 1313.7 },
  { id: 8, busNo: "MH12TV5096", lossKM: 1138.4 },
  { id: 9, busNo: "MH12TV5406", lossKM: 1121.3 },
  { id: 10, busNo: "MH12NK8721", lossKM: 1115.5 },
  { id: 11, busNo: "MH12NW7158", lossKM: 1075.4 },
  { id: 12, busNo: "MH12NS5383", lossKM: 1037.6 },
  { id: 13, busNo: "MH12TV1480", lossKM: 1007.6 },
];

export const BusLossTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="px-4 py-3 text-left font-medium w-10">#</th>
            <th className="px-4 py-3 text-left font-medium">Bus Reg. No.</th>
            <th className="px-4 py-3 text-right font-medium">Loss KM</th>
          </tr>
        </thead>
        <tbody>
          {busData.map((item) => (
            <tr key={item.id} className="border-b border-border/40">
              <td className="px-4 py-2.5 text-muted-foreground">{item.id}</td>
              <td className="px-4 py-2.5">{item.busNo}</td>
              <td className="px-4 py-2.5 text-right">{item.lossKM.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
        <span>1 - 13 / 313</span>
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
