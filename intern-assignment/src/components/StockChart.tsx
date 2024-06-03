import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface ChartData {
  date: string;
  value: number;
}

interface StockChartProps {
  chartData: ChartData[];
}

const StockChart: React.FC<StockChartProps> = ({ chartData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartData.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
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
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "FB Stock Prices",
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Price (USD)",
                },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return (
    <div className="bg-white shadow rounded p-4">
      <canvas id="myChart" ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default StockChart;
