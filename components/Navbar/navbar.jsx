import React, { useState } from 'react';
import './navbar.css';
import logo from '../../assets/default.png';
import { FaBookmark } from 'react-icons/fa'; // Changed to FaBookmark
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Navbar = ({ onContactClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, logout } = useUser();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Company Logo" className="navbar-logo" />
      <ul className="navbar-menu">
        <li className="navbar-item"><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></li>
        <li className="navbar-item"><Link to="/about" style={{ textDecoration: 'none' }}>About Us</Link></li>
        <li className="navbar-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <span>Services</span>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li className="dropdown-item"><Link to="/school" style={{ textDecoration: 'none' }}>School</Link></li>
              <li className="dropdown-item"><Link to="/kindergarten" style={{ textDecoration: 'none' }}>Kindergarten</Link></li>
              <li className="dropdown-item"><Link to="/social-child-project" style={{ textDecoration: 'none' }}>Social Child Project</Link></li>
              <li className="dropdown-item"><Link to="/social-teenager-project" style={{ textDecoration: 'none' }}>Social Teenager Projects</Link></li>
            </ul>
          )}
        </li>
        <li className="navbar-item" onClick={onContactClick}>Contact</li>
      </ul>
      <ul className="navbar-end">
        <li className="navbar-item"><Link to="/cart" style={{ textDecoration: 'none' }}><p><FaBookmark /></p></Link></li>
        {user ? (
          <>
            <li className="navbar-item"><Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link></li>
            <li className="navbar-item" onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <>
            <li className="navbar-item"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>
            <li className="navbar-item signup-button">
              <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
