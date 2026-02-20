import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const rating = food.rating || 4.5;
  // logic for the featured badge
  const isFeatured = rating >= 4.8;

  const handleAdd = () => {
    addToCart(food);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="food-card">
      {/* FEATURED BADGE */}
      {isFeatured && (
        <div className="featured-badge">
          🌿 Featured
        </div>
      )}

      {showToast && <div className="toast">🌿 Added to basket!</div>}
      
      <img src={food.image} alt={food.name} className="food-img" />
      
      <div className="food-info">
        <div className="header-row">
          <h3 className="food-name">{food.name}</h3>
          <div className="rating-badge">
             ⭐ <span>{rating}</span>
          </div>
        </div>

        <p className="food-desc">{food.desc}</p>
        
        <div className="card-footer">
          <span className="food-price">${food.price.toFixed(2)}</span>
          <button onClick={handleAdd} className="add-btn">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;