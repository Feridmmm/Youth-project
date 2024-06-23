import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/default.png';
import { FaArrowLeft } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="back-arrow">
        <Link to="/"><FaArrowLeft /></Link>
      </div>
      <div className="login-box">
        <h2>Welcome</h2>
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="login-footer">
        <p>&copy; 2024 Education Chemnitz. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
