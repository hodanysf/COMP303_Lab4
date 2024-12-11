import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Blood Bank App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/donors">Donors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blood-banks">Blood Banks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blood-stocks">Blood Stocks</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
