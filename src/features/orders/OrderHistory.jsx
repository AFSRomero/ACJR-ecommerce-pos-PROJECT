import { useEffect, useState } from "react";
import api from "@/app/api";
import echo from "@/app/echo";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pos, ecommerce

  useEffect(() => {
    fetchOrders();

    const channel = echo.channel("orders")
      .listen(".orders.created", (e) => {
        // Add new order to top of list instantly
        setOrders(prev => [e.order, ...prev]);
      });

    return () => channel.stopListening(".orders.created");
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(o => o.source === filter);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="filter-tabs">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "pos" ? "active" : ""} onClick={() => setFilter("pos")}>POS Terminal</button>
          <button className={filter === "ecommerce" ? "active" : ""} onClick={() => setFilter("ecommerce")}>Online Store</button>
        </div>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Source</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id}>
                <td className="order-number">#{o.order_number}</td>
                <td>
                  <span className={`source-pill ${o.source}`}>
                    {o.source === 'pos' ? '📟 POS' : '🌐 Online'}
                  </span>
                </td>
                <td className="order-amount">₱{parseFloat(o.total_amount).toLocaleString()}</td>
                <td><span className="status-pill">Completed</span></td>
                <td className="order-time">{new Date(o.created_at).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}