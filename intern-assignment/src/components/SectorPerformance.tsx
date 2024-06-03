import React from "react";

interface Sector {
  name: string;
  change: number;
}

interface SectorPerformanceProps {
  sectors: Sector[];
}

const SectorPerformance: React.FC<SectorPerformanceProps> = ({ sectors }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg mb-2">Sector Performance</h2>
      <ul>
        {sectors.map((sector, index) => (
          <li
            key={sector.name}
            className={`flex justify-between py-2 ${
              index < sectors.length - 1 ? "border-b" : "" // Add border-b except for the last item
            }`}>
            <span>{sector.name}</span>
            <span
              className={`${
                sector.change > 0 ? "text-green-500" : "text-red-500"
              } flex items-center`}>
              {sector.change > 0 ? "+" : ""}
              {sector.change}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorPerformance;
