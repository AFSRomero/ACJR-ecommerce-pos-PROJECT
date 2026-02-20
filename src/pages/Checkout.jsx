import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartTotal, cart } = useCart();

  const handleOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your basket is empty!");
      return;
    }
    alert("Foodino order placed successfully! 🌿");
    navigate('/history');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Finalize Your Order</h1>
        <p className="checkout-subtitle">Total Amount: <span>${cartTotal.toFixed(2)}</span></p>
        
        <form className="checkout-form" onSubmit={handleOrder}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>

          <div className="input-group">
            <label>Delivery Address</label>
            <input type="text" placeholder="123 Leafy Lane" required />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="0912 345 6789" required />
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;    