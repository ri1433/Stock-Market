import React from "react";

interface MarketSummaryProps {
  headline: string;
  sentiment: string;
}

const MarketSummary: React.FC<MarketSummaryProps> = ({
  headline,
  sentiment,
}) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg mb-2">The markets are {sentiment}</h2>
      <p>{headline}</p>
    </div>
  );
};

export default MarketSummary;
