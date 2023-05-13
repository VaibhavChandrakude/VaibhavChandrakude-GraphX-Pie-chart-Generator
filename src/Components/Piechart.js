import React, { useState, useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Piechart = () => {
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [alertValue, setAlertValue] = useState("");
  const [alertTriggered, setAlertTriggered] = useState(false);

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
            backgroundColor: [
              "#5A67D8",
              "#7F84E4",
              "#B3B7F5",
              "#E5E7F0",
              "#D2D4DC",
              "#B8B9C1",
            ],
            borderWidth: 0,
          },
        ],
      });
    };
    fetchCoinData();
  }, [id]);

  useEffect(() => {
    if (alertValue && coinData) {
      const currentPrice = coinData.market_data.current_price.usd;
      if (alertValue < currentPrice) {
        setAlertTriggered(true);
      } else {
        setAlertTriggered(false);
      }
    }
  }, [alertValue, coinData]);

  const handleAlertChange = (event) => {
    setAlertValue(event.target.value);
  };

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
        height: "80vh",  // set a fixed height for the container element
        overflowY: "scroll",  // add overflow-y property with scroll value
      }}
    >
      <h2>{coinData.name}</h2>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
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
    
      <button
  style={{
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "20px",
    cursor: "pointer",
  }}
>
  <Link
    to={`/PriceComparison/${id}`}
    style={{ textDecoration: "none", color: "#fff" }}
  >
    Compare Prices
  </Link>
</button>


      <div>
        
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="price-alert">Price Alert:</label>
        <input
          type="number"
          id="price-alert"
          value={alertValue}
          onChange={handleAlertChange}
          style={{ marginLeft: "10px" }}
        />
        {alertTriggered && (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            Price Alert Triggered!
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Piechart;