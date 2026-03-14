import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [], total = 0 } = location.state || {}; // Get data from Home.jsx

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Pikit", // Defaulting to your local area
    paymentMethod: "cod"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call api.post('/orders', { ...formData, items: cart })
    alert("Order placed successfully! Redirecting to tracking...");
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>Back to Menu</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-grid">
        {/* LEFT: DELIVERY FORM */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              required 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              required 
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <textarea 
              required 
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="radio-group">
              <label>
                <input type="radio" name="payment" value="cod" defaultChecked />
                Cash on Delivery
              </label>
              <label>
                <input type="radio" name="payment" value="gcash" />
                GCash / E-Wallet
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order (₱{total.toLocaleString()})
          </button>
        </form>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.qty}x {item.name}</span>
                <span>₱{(item.qty * item.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-row total">
            <span>Amount to Pay:</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}