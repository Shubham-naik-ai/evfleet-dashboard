import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardFiltersProps {
  selectedProject: string;
  selectedDepot: string;
  onProjectChange: (project: string) => void;
  onDepotChange: (depot: string) => void;
}

const projects = [
  "PMPML",
  "SILVASA",
  "DEHRADUN",
  "KSRTC",
  "GSRTC",
  "NAGPUR",
  "APSRTC",
  "SURAT",
  "TMTU",
  "KTC - GOA",
  "IDR - GOA",
  "TGSRTC",
  "BEST",
  "MSRTC 100",
  "MSRTC 5150"
];

const depotsByProject: Record<string, string[]> = {
  "PMPML": ["BANER", "BHEKRAI NAGAR", "NIGDI", "PUNE STATION", "WAGHOLI"],
  "BEST": ["KURLA"],
  // Other projects can be added with their respective depots
};

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedProject,
  selectedDepot,
  onProjectChange,
  onDepotChange,
}) => {
  const availableDepots = selectedProject ? depotsByProject[selectedProject] || [] : [];

  const handleProjectChange = (project: string) => {
    onProjectChange(project);
    // Reset depot when project changes
    if (depotsByProject[project]?.length > 0) {
      onDepotChange(depotsByProject[project][0]);
    } else {
      onDepotChange("");
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="min-w-[200px]">
        <Select value={selectedProject} onValueChange={handleProjectChange}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            {projects.map((project) => (
              <SelectItem key={project} value={project} className="hover:bg-gray-100">
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[200px]">
        <Select 
          value={selectedDepot} 
          onValueChange={onDepotChange}
          disabled={!selectedProject || availableDepots.length === 0}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select Depot" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg z-50">
            {availableDepots.map((depot) => (
              <SelectItem key={depot} value={depot} className="hover:bg-gray-100">
                {depot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
