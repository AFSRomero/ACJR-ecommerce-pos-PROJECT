import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your basket is empty!");
    return;
  }

  if (loading) return;

  setLoading(true);

  try {
    const orderPayload = {
      source: "ecommerce",
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.qty,
        ingredients: item.ingredients?.map(ing => ({
          id: ing.id,
          version: ing.version
        })) || []
      }))
    };

    const response = await api.post('/orders', orderPayload);
    
    alert("Order placed successfully!");
    clearCart();
    console.log("Execution Time:", response.data.execution_time_seconds);
    navigate('/history');

  } catch (error) {
    console.error(error);
    alert("Order failed. Possibly stock conflict.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Finalize Your Order</h1>
        <p className="checkout-subtitle">
          Total Amount: <span>${cartTotal.toFixed(2)}</span>
        </p>

        <form onSubmit={handleOrder}>
          <button 
  type="submit" 
  className="place-order-btn"
  disabled={loading}
>
  {loading ? "Processing..." : "Place Order"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;