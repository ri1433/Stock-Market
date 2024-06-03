import React from "react";

interface MarketData {
  name: string;
  value: number;
  change: number;
  percentageChange: number;
}

interface MarketsOverviewProps {
  markets: MarketData[];
}

const MarketsOverview: React.FC<MarketsOverviewProps> = ({ markets }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg mb-2 text-white">Markets Overview</h2>
      <ul className="divide-y divide-gray-600">
        {markets.map((market) => (
          <li key={market.name} className="flex justify-between py-2">
            <span className="text-white">{market.name}</span>
            <span className="text-white">${market.value.toFixed(2)}</span>
            <span
              className={`text-sm ${
                market.change >= 0 ? "text-green-500" : "text-red-500"
              }`}>
              {market.change >= 0
                ? `+${market.change.toFixed(2)}`
                : market.change.toFixed(2)}{" "}
              ({market.percentageChange.toFixed(2)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketsOverview;
