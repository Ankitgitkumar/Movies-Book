import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieBook</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
