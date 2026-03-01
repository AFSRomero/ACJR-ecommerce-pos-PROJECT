import { useEffect, useState } from "react";
import echo from "../services/echo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function POSDashboard() {
  const [orders, setOrders] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
  await logout();
  navigate("/login");
  };


  useEffect(() => {
    console.log("POS mounted");

    echo.channel("orders")
      .listen(".orders.created", (e) => {
        console.log("New order:", e.order);
        setOrders((prev) => [e.order, ...prev]);
      });

    echo.channel("inventory")
      .listen(".inventory.low_stock", (e) => {
        console.log("Low stock event:", e);
        alert(`⚠ Low stock: ${e.ingredient_name}
Remaining: ${e.remaining_stock}`);
      });

    return () => {
      echo.leave("orders");
      echo.leave("inventory");
    };
  }, []);

  return (
    <div>
      <h1>Live Orders</h1>

      {orders.length === 0 && <p>No incoming orders...</p>}

      {orders.map((order) => (
        <div key={order.id} style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "10px"
        }}>
          <h3>{order.order_number}</h3>
          <p>Total: ₱{order.total_amount}</p>
          <p>Status: {order.status}</p>
          <p>Source: {order.source}</p>
        </div>
      ))}
    </div>
  );
}