import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
      );
      setCoins(response.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <h1 style={{marginBottom: '2rem'}}>Crypto Currency Index</h1>
      <table style={{borderCollapse: 'collapse', width: '80%', margin: 'auto'}}>
        <thead style={{backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd'}}>
          <tr>
            <th style={{padding: '1rem 0.5rem'}}>Name</th>
            <th style={{padding: '1rem 0.5rem'}}>Image</th>
            <th style={{padding: '1rem 0.5rem'}}>Symbol</th>
            <th style={{padding: '1rem 0.5rem'}}>Price</th>
            <th style={{padding: '1rem 0.5rem'}}>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} style={{borderBottom: '1px solid #ddd'}}>
              <td style={{padding: '1rem 0.5rem'}}>
                <Link to={`/coins/${coin.id}`}>{coin.name}</Link>
              </td>
              <td style={{padding: '1rem 0.5rem'}}>
                <img src={coin.image} alt={coin.name} style={{width: '30px'}}/>
              </td>
              <td style={{padding: '1rem 0.5rem'}}>{coin.symbol.toUpperCase()}</td>
              <td style={{padding: '1rem 0.5rem'}}>${coin.current_price.toLocaleString()}</td>
              <td style={{padding: '1rem 0.5rem'}}>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
