import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Payment() {
  const { cart, clearCart } = useContext(CartContext);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        { items: cart }
      );

      alert("Transaction Successful!");
      clearCart();

    } catch (error) {
      if (error.response.status === 409) {
        alert("Concurrency conflict. Please refresh.");
      } else if (error.response.status === 400) {
        alert("Insufficient Inventory.");
      } else {
        alert("Transaction Failed.");
      }
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
}

export default Payment;
