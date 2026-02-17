import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x {item.quantity}
        </div>
      ))}
      <h3>Total: ₱{total}</h3>
      <button onClick={() => navigate("/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;
