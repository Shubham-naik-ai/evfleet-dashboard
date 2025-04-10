
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Sample data for bus-wise loss kilometers
const busData = [
  { regNo: "MH12NE9391", type: "AC", scheduled: 4850, operated: 2350, loss: 2500, lossPercent: 51.5 },
  { regNo: "MH12AB1234", type: "Mini", scheduled: 3240, operated: 1640, loss: 1600, lossPercent: 49.4 },
  { regNo: "MH12CD5678", type: "Non-AC", scheduled: 3980, operated: 2580, loss: 1400, lossPercent: 35.2 },
  { regNo: "MH12EF9012", type: "AC", scheduled: 4120, operated: 2850, loss: 1270, lossPercent: 30.8 },
  { regNo: "MH12GH3456", type: "Non-AC", scheduled: 3750, operated: 2520, loss: 1230, lossPercent: 32.8 },
  { regNo: "MH12IJ7890", type: "Mini", scheduled: 2850, operated: 1680, loss: 1170, lossPercent: 41.1 },
  { regNo: "MH12KL1234", type: "AC", scheduled: 4560, operated: 3410, loss: 1150, lossPercent: 25.2 },
  { regNo: "MH12MN5678", type: "Non-AC", scheduled: 3680, operated: 2540, loss: 1140, lossPercent: 31.0 },
  { regNo: "MH12OP9012", type: "AC", scheduled: 4240, operated: 3120, loss: 1120, lossPercent: 26.4 },
  { regNo: "MH12QR3456", type: "Mini", scheduled: 2980, operated: 1870, loss: 1110, lossPercent: 37.2 },
];

export const BusLossTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="px-4 py-3 text-left font-medium">Reg. No.</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-right font-medium">
              <div className="flex items-center justify-end gap-1">
                Loss KM
                <div className="flex flex-col">
                  <ChevronUp size={12} className="text-muted-foreground" />
                  <ChevronDown size={12} className="-mt-1 text-muted-foreground" />
                </div>
              </div>
            </th>
            <th className="px-4 py-3 text-right font-medium">Loss %</th>
          </tr>
        </thead>
        <tbody>
          {busData.map((bus, index) => (
            <tr key={index} className="border-b border-border/40 hover:bg-muted/20">
              <td className="px-4 py-2.5 font-medium">{bus.regNo}</td>
              <td className="px-4 py-2.5">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  bus.type === 'AC' ? 'bg-blue-100 text-blue-800' :
                  bus.type === 'Non-AC' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {bus.type}
                </span>
              </td>
              <td className="px-4 py-2.5 text-right text-red-500">{bus.loss.toLocaleString()}</td>
              <td className="px-4 py-2.5 text-right text-red-500">{bus.lossPercent.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
