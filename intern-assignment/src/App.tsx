import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import MarketSummary from "./components/MarketSummary";
import SectorPerformance from "./components/SectorPerformance";
import MarketsOverview from "./components/MarketsOverview";
import "./index.css";

Chart.register(...registerables);

interface ChartData {
  date: string;
  value: number;
}

const App: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const dummyChartData: ChartData[] = [
    { date: "2023-05-01", value: 150 },
    { date: "2023-05-02", value: 152 },
    { date: "2023-05-03", value: 148 },
    { date: "2023-05-04", value: 149 },
    { date: "2023-05-05", value: 151 },
    { date: "2023-05-06", value: 153 },
    { date: "2023-05-07", value: 154 },
    { date: "2023-05-08", value: 155 },
    { date: "2023-05-09", value: 156 },
    { date: "2023-05-10", value: 158 },
    { date: "2023-05-11", value: 157 },
    { date: "2023-05-12", value: 159 },
    { date: "2023-05-13", value: 160 },
    { date: "2023-05-14", value: 161 },
    { date: "2023-05-15", value: 162 },
    { date: "2023-05-16", value: 161 },
    { date: "2023-05-17", value: 160 },
    { date: "2023-05-18", value: 159 },
    { date: "2023-05-19", value: 158 },
    { date: "2023-05-20", value: 160 },
    { date: "2023-05-21", value: 161 },
    { date: "2023-05-22", value: 162 },
    { date: "2023-05-23", value: 163 },
    { date: "2023-05-24", value: 164 },
    { date: "2023-05-25", value: 165 },
    { date: "2023-05-26", value: 166 },
    { date: "2023-05-27", value: 167 },
    { date: "2023-05-28", value: 168 },
  ];

  useEffect(() => {
    // setChartData(dummyChartData);

    // Uncomment the below code to fetch real data from the API

    const fetchIntradayData = async () => {
      const apiKey = "HGJWFG4N8AQ66ICD";
      const symbol = "FB";

      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: "TIME_SERIES_DAILY",
            symbol: symbol,
            outputsize: "compact",
            datatype: "json",
            apikey: apiKey,
          },
        });

        const timeSeries = response.data["Time Series (Daily)"];
        const formattedData = Object.keys(timeSeries).map((date) => ({
          date,
          value: parseFloat(timeSeries[date]["4. close"]),
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching intraday data:", error);
      }
    };

    fetchIntradayData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0 && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.map((data) => data.date),
            datasets: [
              {
                label: "FB Stock Prices",
                data: chartData.map((data) => data.value),
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  color: "white",
                },
              },
              title: {
                display: true,
                text: "FB Stock Prices",
                color: "white",
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Time",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Price (USD)",
                  color: "white",
                },
                ticks: {
                  color: "white",
                },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <NavBar isOpen={navOpen} setNavOpen={setNavOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          navOpen ? "ml-64" : "ml-16"
        }`}>
        <Header userName="Jane" />
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <div className="lg:col-span-2 xl:col-span-1">
            <MarketSummary
              headline="Jan Inflation Surges, Squeezing Budgets; S&P 500 Rallies as Markets Face 'Bumpy' 2% Path"
              sentiment="bullish"
            />
          </div>
          <SectorPerformance
            sectors={[
              { name: "Industrials", change: 1.66 },
              { name: "Communication Services", change: 1.55 },
              { name: "Technology", change: 1.08 },
              { name: "Consumer Cyclical", change: 1.02 },
              { name: "Healthcare", change: 0.84 },
              { name: "Real Estate", change: 0.69 },
              { name: "Basic Materials", change: 0.65 },
              { name: "Utilities", change: 0.57 },
              { name: "Energy", change: -0.05 },
              { name: "Consumer Defensive", change: -0.12 },
            ]}
          />
          <MarketsOverview
            markets={[
              {
                name: "S&P 500",
                value: 498.84,
                change: 4.76,
                percentageChange: 0.96,
              },
              {
                name: "Nasdaq",
                value: 433.35,
                change: 4.8,
                percentageChange: 1.12,
              },
              {
                name: "Dow Jones",
                value: 384.31,
                change: 1.49,
                percentageChange: 0.39,
              },
              {
                name: "Russell 2000",
                value: 199.45,
                change: 4.84,
                percentageChange: 2.49,
              },
              {
                name: "Crude Oil",
                value: 71.54,
                change: -1.11,
                percentageChange: -1.53,
              },
              {
                name: "Gold",
                value: 184.42,
                change: -0.1,
                percentageChange: -0.06,
              },
              {
                name: "Silver",
                value: 20.44,
                change: 0.24,
                percentageChange: 1.21,
              },
              {
                name: "10-Year Bond",
                value: 93.88,
                change: 0.34,
                percentageChange: 0.36,
              },
              {
                name: "Bitcoin",
                value: 37.84,
                change: 1.14,
                percentageChange: 3.11,
              },
            ]}
          />
          <div>
            <div className="relative h-96">
              <canvas id="myChart" ref={chartRef} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
