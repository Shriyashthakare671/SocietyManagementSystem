import React from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"><b style ={{colour : 'Red'}}>R</b>esido</Link> {/* Updated class name */}
        <ul className="navbar-nav-links">
          <li><Link to="/login">Login</Link></li>
          {/* Add more list items for additional navbar links */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
