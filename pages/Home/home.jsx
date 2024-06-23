// pages/Home/home.jsx
import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/navbar';
import Body from '../../components/Body/body';
import Footer from '../../components/Footer/footer';

const Home = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <Navbar onContactClick={scrollToFooter} />
      <Body />
      <Footer ref={footerRef} />
    </div>
  );
};

export default Home;
