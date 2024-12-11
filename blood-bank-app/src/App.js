import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Donor from './components/Donor';
import BloodBank from './components/BloodBank';
import BloodStock from './components/BloodStock';
import EditDonor from './components/EditDonor';
import DonorHistory from './components/DonorHistory';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/donors" element={<Donor />} />
        <Route path="/blood-banks" element={<BloodBank />} />
        <Route path="/blood-stocks" element={<BloodStock />} />
        <Route path="/donor/edit/:id" element={<EditDonor />} />
        <Route path="/donor/history/:id" element={<DonorHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
