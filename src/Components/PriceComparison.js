import React, { useState, useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const PriceComparison = () => {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCoinData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/tickers`
      );
      const tickers = response.data.tickers;
      const labels = [];
      const data = [];

      tickers.forEach((ticker) => {
        labels.push(ticker.market.name);
        data.push(ticker.converted_last.usd);
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Price Comparison",
            data: data,
            fill: false,
            backgroundColor: "#5A67D8",
            borderColor: "#5A67D8",
            borderWidth: 2,
          },
        ],
      });
      setCoinData(response.data);
    };
    fetchCoinData();
  }, [id]);

  if (!coinData || !chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95vw",
      }}
    >
      <h2>Price Comparison for {coinData.name}</h2>
      <div style={{ width: "80%", margin: "10px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default PriceComparison;
