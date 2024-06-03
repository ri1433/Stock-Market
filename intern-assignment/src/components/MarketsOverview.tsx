import React from "react";
import "./MarketsOverview.css";

interface Market {
  name: string;
  value: number;
  change: number;
  percentageChange: number;
}

interface MarketsOverviewProps {
  markets: Market[];
}

const MarketsOverview: React.FC<MarketsOverviewProps> = ({ markets }) => (
  <section className="markets-overview">
    <h2>Markets Overview</h2>
    <ul>
      {markets.map((market, index) => (
        <li key={index}>
          <span>{market.name}</span>
          <span>{market.value}</span>
          <span className={market.change >= 0 ? "positive" : "negative"}>
            {market.change} ({market.percentageChange}%)
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default MarketsOverview;
