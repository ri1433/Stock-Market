import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import MarketSummary from "./components/MarketSummary";
import SectorPerformance from "./components/SectorPerformance";
import MarketsOverview from "./components/MarketsOverview";
import Chart from "./components/Chart";
import "./App.css";

interface Sector {
  name: string;
  change: number;
}

interface Market {
  name: string;
  value: number;
  change: number;
  percentageChange: number;
}

interface ChartData {
  date: string;
  value: number;
}

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>("Jane");
  const [headline, setHeadline] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const apiKey = "3C18SS2ZWDURIQK9";
    const symbol = "IBM"; // Example symbol
    //const interval = "5min"; // Example interval

    if (!apiKey) {
      console.error("API key is missing");
      return;
    }

    const fetchIntradayData = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: symbol,
            //interval: interval,
            //adjusted: true,
            outputsize: "compact",
            datatype: "json",
            apikey: apiKey,
          },
        });
        console.log(response);

        const timeSeries = response.data["Time Series (Daily)"];
        const formattedData = Object.keys(timeSeries).map((date) => ({
          date,
          value: parseFloat(timeSeries[date]["4. close"]),
        }));
        console.log(timeSeries);

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching intraday data:", error);
      }
    };

    fetchIntradayData();
  }, []);

  return (
    <div className="app">
      <Header userName={userName} />
      <NavBar />
      <main className="main-content">
        <MarketSummary headline={headline} sentiment={sentiment} />
        <SectorPerformance sectors={sectors} />
        <MarketsOverview markets={markets} />
        <Chart data={chartData} />
      </main>
    </div>
  );
};

export default App;
