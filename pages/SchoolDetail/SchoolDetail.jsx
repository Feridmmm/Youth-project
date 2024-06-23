import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './SchoolDetail.css';

const schoolUrl = "http://localhost:8000/api/schools/";

const SchoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const { addToCart } = useCart();
  const images = [
    'https://engage-education.com/wp-content/uploads/2022/08/Private-School.jpg',
    'https://images2.alphacoders.com/720/720843.jpg',
    'https://cdn.create.vista.com/api/media/small/12519950/stock-photo-smart-schoolgirl',
    'https://media.istockphoto.com/id/1819810538/photo/applauding-on-a-class-at-high-school.jpg?s=612x612&w=0&k=20&c=iUOEjH5k_9_ahiviXpmyucCdPZujGckE-0uxpqn5zno='
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${schoolUrl}${id}/`, { withCredentials: true }).then(response => {
      const schoolData = response.data;
      const imageUrl = images[id % images.length];
      setSchool({ ...schoolData, imageUrl });
      setSelectedImage(imageUrl);
    }).catch(error => {
      console.error("Error fetching the school data", error);
    });
  }, [id]);

  const handleAddToCart = (school) => {
    addToCart({ ...school, image: school.imageUrl });
    navigate('/cart');
  };

  if (!school) return <div>Loading...</div>;

  return (
    <div className="school-detail-page">
      <Navbar />
      <div className="school-detail-container">
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`School ${index + 1}`}
              className={`gallery-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="school-detail-content">
          <img src={selectedImage} alt={school.name} className="school-detail-image" />
          
          <p><strong>Address:</strong> {school.address}</p>
          <p><strong>Phone:</strong> {school.phone}</p>
          <p><strong>Postal Code:</strong> {school.postal_code}</p>
          <button className="cart-button" onClick={() => handleAddToCart(school)}>
             Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetail;
