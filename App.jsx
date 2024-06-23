// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import School from './pages/School/school';
import About from './pages/About/about';
import SchoolDetail from './pages/SchoolDetail/SchoolDetail';
import Kindergarten from './pages/Kindergarten/kindergarten';
import KindergartenDetail from './pages/KindergartenDetail/KindergartenDetail';
import SocialChildProject from './pages/SocialChildProject/SocialChildProject';
import SocialChildProjectDetail from './pages/SocialChildProjectDetail/SocialChildProjectDetail';
import SocialTeenagerProject from './pages/SocialTeenagerProject/socialTeenagerProject';
import SocialTeenagerProjectDetail from './pages/SocialTeenagerProjectDetail/SocialTeenagerProjectDetail';
import Cart from './pages/Cart/cart';
import Profile from './pages/Profile/Profile';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <UserProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/school" element={<School />} />
              <Route path="/schools/:id" element={<SchoolDetail />} />
              <Route path="/kindergarten" element={<Kindergarten />} />
              <Route path="/kindergartens/:id" element={<KindergartenDetail />} />
              <Route path="/social-child-project" element={<SocialChildProject />} />
              <Route path="/social-child-projects/:id" element={<SocialChildProjectDetail />} />
              <Route path="/social-teenager-project" element={<SocialTeenagerProject />} />
              <Route path="/social-teenager-projects/:id" element={<SocialTeenagerProjectDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </UserProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
