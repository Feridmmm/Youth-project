import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import logo from '../../assets/default.png';
import { FaArrowLeft } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(username, email, password, address, zipCode);
    if (success) {
      navigate('/profile');
    } else {
      alert('Signup failed. This user already exists.');
    }
  };

  return (
    <div className="signup-container">
      <div className="back-arrow">
        <Link to="/"><FaArrowLeft /></Link>
      </div>
      <div className="signup-box">
        <h2>Sign Up</h2>
        <img src={logo} alt="Logo" className="signup-logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <button type="submit" className="signup-button">Sign Up</button>
          </div>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="signup-footer">
        <p>&copy; 2024 Education Chemnitz. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
