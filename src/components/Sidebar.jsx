import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <aside className="cart-sidebar">
      <h2 className="sidebar-title">Your Order</h2>
      
      {cart.length === 0 ? (
        /* Empty State View */
        <div className="empty-cart-view">
          <div className="leaf-icon">🌿</div>
          <p>Your basket is empty</p>
          <span>Time to pick some fresh meals!</span>
        </div>
      ) : (
        /* Active Cart View */
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="sidebar-item">
                <div className="item-details">
                  <span className="item-qty">{item.qty}x</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="item-price-row">
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="total-row">
              <span>Total</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-now-btn"
              onClick={() => navigate('/checkout')}
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;