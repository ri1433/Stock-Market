import React from "react";
import "./MarketsSummary.css";

interface MarketSummaryProps {
  headline: string;
  sentiment: string;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({
  headline,
  sentiment,
}) => (
  <section className="market-summary">
    <div className="summary-header">
      <span className="sentiment">{sentiment}</span>
    </div>
    <h2>Market Summary</h2>
    <p>{headline}</p>
  </section>
);

export default MarketSummary;
