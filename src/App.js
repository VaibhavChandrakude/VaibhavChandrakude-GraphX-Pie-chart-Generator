import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Piechart from './Components/Piechart';
import PriceComparison from "./Components/PriceComparison";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import './Styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<Piechart />} />
        <Route path="/PriceComparison/:id" element={<PriceComparison />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
