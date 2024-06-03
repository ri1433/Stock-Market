import React from "react";
import "./SectorPerformance.css";

interface Sector {
  name: string;
  change: number;
}

interface SectorPerformanceProps {
  sectors: Sector[];
}

const SectorPerformance: React.FC<SectorPerformanceProps> = ({ sectors }) => (
  <section className="sector-performance">
    <h2>Sector Performance</h2>
    <ul>
      {sectors.map((sector, index) => (
        <li
          key={index}
          className={sector.change >= 0 ? "positive" : "negative"}>
          {sector.name}: {sector.change}%
        </li>
      ))}
    </ul>
  </section>
);

export default SectorPerformance;
