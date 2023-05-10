import React, { useState, useEffect } from "react";
import axios from "axios";
import 'chart.js/auto';
import { Pie, Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const Piechart = () => {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCoinData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinData(response.data);
      setChartData({
        labels: ["Current Price", "Market Cap", "24h Volume"],
        datasets: [
          {
            label: "Statistics",
            data: [
              response.data.market_data.current_price.usd,
              response.data.market_data.market_cap.usd,
              response.data.market_data.total_volume.usd,
            ],
            backgroundColor: ["#5A67D8", "#7F84E4", "#B3B7F5", "#E5E7F0", "#D2D4DC", "#B8B9C1"],
            borderWidth: 0,
          },
        ],
      });
      
    };
    fetchCoinData();
  }, [id]);

  if (!coinData || !chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "95vw" }}>
      <h2>{coinData.name}</h2>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div style={{ width: "45%", margin: "10px" }}>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div style={{ width: "45%", margin: "10px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              indexAxis: "y",
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Piechart;
