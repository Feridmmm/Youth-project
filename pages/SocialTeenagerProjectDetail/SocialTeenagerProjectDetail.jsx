import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './SocialTeenagerProjectDetail.css';

const socialTeenagerProjectUrl = "http://localhost:8000/api/social-teenager-projects/";

const SocialTeenagerProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socialTeenagerProject, setSocialTeenagerProject] = useState(null);
  const { addToCart } = useCart();
  const images = [
    'https://www.childrensinstitute.org/wp-content/uploads/2018/08/DSC7086CroppedWO.jpg',
    'https://www.newportacademy.com/wp-content/uploads/eliott-reyna-5KrZ3UoDKC4-unsplash.jpg',
    'https://localanchor.com/wp-content/uploads/2022/06/Depositphotos_53462403_S-1-768x513.jpg',
    'https://www.jssa.org/wp-content/uploads/2020/05/teens-socializing.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${socialTeenagerProjectUrl}${id}/`, { withCredentials: true }).then(response => {
      const socialTeenagerProjectData = response.data;
      const imageUrl = images[id % images.length];
      setSocialTeenagerProject({ ...socialTeenagerProjectData, imageUrl });
      setSelectedImage(imageUrl);
    }).catch(error => {
      console.error("Error fetching the social teenager project data", error);
    });
  }, [id]);

  const handleAddToCart = (socialTeenagerProject) => {
    addToCart({ ...socialTeenagerProject, image: socialTeenagerProject.imageUrl });
    navigate('/cart');
  };

  if (!socialTeenagerProject) return <div>Loading...</div>;

  return (
    <div className="social-teenager-project-detail-page">
      <Navbar />
      <div className="social-teenager-project-detail-container">
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Social Teenager Project ${index + 1}`}
              className={`gallery-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="social-teenager-project-detail-content">
          <img src={selectedImage} alt={socialTeenagerProject.name} className="social-teenager-project-detail-image" />
          
          <p><strong>Address:</strong> {socialTeenagerProject.address}</p>
          <p><strong>Phone:</strong> {socialTeenagerProject.phone}</p>
          <p><strong>Postal Code:</strong> {socialTeenagerProject.postal_code}</p>
          <button className="cart-button" onClick={() => handleAddToCart(socialTeenagerProject)}>
             Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialTeenagerProjectDetail;
