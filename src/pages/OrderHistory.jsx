import React, { useEffect, useState } from 'react';
import api from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get('/orders');
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="history-page">
      <h1>My Orders</h1>

      {orders.map(order => (
        <div key={order.id} style={{
          border: '1px solid #eee',
          padding: '15px',
          borderRadius: '10px',
          margin: '10px 0'
        }}>
          <strong>{order.order_number}</strong>
          <p>Total: ₱{order.total_amount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;