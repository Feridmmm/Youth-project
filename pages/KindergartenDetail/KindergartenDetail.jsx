import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './KindergartenDetail.css';

const kindergartenUrl = "http://localhost:8000/api/kindergartens/";

const KindergartenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kindergarten, setKindergarten] = useState(null);
  const { addToCart } = useCart();
  const images = [
    'https://t3.ftcdn.net/jpg/03/20/81/98/360_F_320819860_ScgqmR8DaFQLGCcg4Gq638ZorwgEpcX8.jpg',
    'https://wallpapercave.com/wp/wp2346065.jpg',
    'https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?cs=srgb&dl=pexels-yankrukov-8613100.jpg&fm=jpg',
    'https://images.ctfassets.net/p0qf7j048i0q/7dm4FcdkSn98OKbj6lrca9/7817e32a3dc3d7d22f62cb500baab014/G1198283214.jpg?w=3840&q=75&h=3840&fm=webp'
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${kindergartenUrl}${id}/`, { withCredentials: true }).then(response => {
      const kindergartenData = response.data;
      const imageUrl = images[id % images.length];
      setKindergarten({ ...kindergartenData, imageUrl });
      setSelectedImage(imageUrl);
    }).catch(error => {
      console.error("Error fetching the kindergarten data", error);
    });
  }, [id]);

  const handleAddToCart = (kindergarten) => {
    addToCart({ ...kindergarten, image: kindergarten.imageUrl });
    navigate('/cart');
  };

  if (!kindergarten) return <div>Loading...</div>;

  return (
    <div className="kindergarten-detail-page">
      <Navbar />
      <div className="kindergarten-detail-container">
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Kindergarten ${index + 1}`}
              className={`gallery-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="kindergarten-detail-content">
          <img src={selectedImage} alt={kindergarten.name} className="kindergarten-detail-image" />
          
          <p><strong>Address:</strong> {kindergarten.address}</p>
          <p><strong>Phone:</strong> {kindergarten.phone}</p>
          <p><strong>Postal Code:</strong> {kindergarten.postal_code}</p>
          <button className="cart-button" onClick={() => handleAddToCart(kindergarten)}>
             Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default KindergartenDetail;
