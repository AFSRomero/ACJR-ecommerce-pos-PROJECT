import React from 'react';
import { useCart } from '../auth/CartContext';

const FoodCard = ({ food, ingredients }) => {
  const { addToCart } = useCart();

  // Logic: Check if ANY required ingredient has 0 or insufficient stock
  const isOutOfStock = food.ingredients?.some(req => {
    const invItem = ingredients.find(i => i.id === req.id);
    // If ingredient doesn't exist or current stock is less than what the recipe needs
    return !invItem || parseFloat(invItem.stock_quantity) < parseFloat(req.quantity_required);
  });

  return (
    <div className={`food-card ${isOutOfStock ? 'oos-blur' : ''}`}>
      <div className="food-image">
        <img src={food.image_url || 'https://via.placeholder.com/300'} alt={food.name} />
        {isOutOfStock && <div className="oos-badge">OUT OF STOCK</div>}
      </div>
      
      <div className="food-info">
        <div className="food-meta">
           <span className="food-category">{food.sku}</span>
           <span className="food-price">₱{parseFloat(food.price).toLocaleString()}</span>
        </div>
        <h3>{food.name}</h3>
        <p className="description">{food.description}</p>
        
        <button 
          className="add-to-cart-btn"
          disabled={isOutOfStock}
          onClick={() => addToCart(food)}
        >
          {isOutOfStock ? 'Currently Unavailable' : 'Add to Order'}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;