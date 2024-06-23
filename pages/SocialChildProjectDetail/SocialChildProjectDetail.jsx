import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './SocialChildProjectDetail.css';

const socialChildProjectUrl = "http://localhost:8000/api/social-child-projects/";

const SocialChildProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socialChildProject, setSocialChildProject] = useState(null);
  const { addToCart } = useCart();
  const images = [
    'https://us.123rf.com/450wm/peopleimages12/peopleimages122211/peopleimages12221112518/193843696-happiness-is-friendship-elementary-school-kids-outside.jpg?ver=6',
    'https://www.bu.edu/files/2020/04/Resize-iStock-185096653.jpg',
    'https://www.littlelives.org.uk/wp-content/uploads/2023/03/cyberbulling-taking-control-of-the-internet.jpg',
    'https://northccs.com/800/600/http/i.pinimg.com/736x/4d/ff/fa/4dfffa6689454b0ae259e185ea8045a8.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${socialChildProjectUrl}${id}/`, { withCredentials: true }).then(response => {
      const socialChildProjectData = response.data;
      const imageUrl = images[id % images.length];
      setSocialChildProject({ ...socialChildProjectData, imageUrl });
      setSelectedImage(imageUrl);
    }).catch(error => {
      console.error("Error fetching the social child project data", error);
    });
  }, [id]);

  const handleAddToCart = (socialChildProject) => {
    addToCart({ ...socialChildProject, image: socialChildProject.imageUrl });
    navigate('/cart');
  };

  if (!socialChildProject) return <div>Loading...</div>;

  return (
    <div className="social-child-project-detail-page">
      <Navbar />
      <div className="social-child-project-detail-container">
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Social Child Project ${index + 1}`}
              className={`gallery-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="social-child-project-detail-content">
          <img src={selectedImage} alt={socialChildProject.name} className="social-child-project-detail-image" />
          
          <p><strong>Address:</strong> {socialChildProject.address}</p>
          <p><strong>Phone:</strong> {socialChildProject.phone}</p>
          <p><strong>Postal Code:</strong> {socialChildProject.postal_code}</p>
          <button className="cart-button" onClick={() => handleAddToCart(socialChildProject)}>
             Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialChildProjectDetail;
