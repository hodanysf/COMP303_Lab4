import React, { useState, useEffect } from 'react';
import API from '../services/api';

const BloodStock = () => {
  const [bloodStocks, setBloodStocks] = useState([]);

  useEffect(() => {
    API.get('/bloodStock/')
      .then((response) => setBloodStocks(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Blood Stock</h1>
      <ul>
        {bloodStocks.map((stock) => (
          <li key={stock.id}>
            {stock.bloodGroup} - {stock.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodStock;
