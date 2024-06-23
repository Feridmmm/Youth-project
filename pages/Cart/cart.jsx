import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import './cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user, saveItem } = useUser();

  const handleSaveItem = async (item) => {
    if (!user) {
      alert('You must be logged in to save an item.');
      return;
    }
    const success = await saveItem(item);
    if (success) {
      alert('Item saved successfully!');
    } else {
      alert('Failed to save item.');
    }
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={`Item ${index + 1}`} />
              </div>
              <div className="cart-item-details">
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Phone:</strong> {item.phone}</p>
                <p><strong>Postal Code:</strong> {item.postal_code}</p>
                <div className="cart-item-buttons">
                  <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
                  <button className="save-button" onClick={() => handleSaveItem(item)}>Save</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
