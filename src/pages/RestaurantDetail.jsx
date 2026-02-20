import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { foodItems } from '../data/mockFood';
import FoodCard from '../components/FoodCard';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the restaurant itself
  const restaurant = {
    name: "Foodino Central Kitchen",
    rating: "4.8",
    deliveryTime: "20-30 mins",
    description: "The best gourmet burgers and pizzas in the city.",
    address: "123 Delivery Lane, Food City"
  };

  return (
    <div className="restaurant-detail">
      <button onClick={() => navigate(-1)} className="back-btn">← Back to Menu</button>
      
      <div className="res-header">
        <h1>{restaurant.name}</h1>
        <div className="res-meta">
          <span>⭐ {restaurant.rating}</span> | <span>🕒 {restaurant.deliveryTime}</span>
        </div>
        <p>{restaurant.description}</p>
        <p><small>{restaurant.address}</small></p>
      </div>

      <hr />

      <h2>Popular Items</h2>
      <div className="food-grid">
        {foodItems.map(item => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;