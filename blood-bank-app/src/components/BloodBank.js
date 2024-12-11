import React, { useState, useEffect } from 'react';
import API from '../services/api';

const BloodBank = () => {
  const [bloodBanks, setBloodBanks] = useState([]);

  useEffect(() => {
    API.get('/bloodBank/')
      .then((response) => setBloodBanks(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Blood Banks</h1>
      <ul>
        {bloodBanks.map((bank) => (
          <li key={bank.id}>
            {bank.bloodbankName} - {bank.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodBank;
