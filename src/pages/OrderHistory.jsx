import React from 'react';

const OrderHistory = () => {
  const pastOrders = [
    { id: '#1001', date: '2026-02-18', total: 28.49, status: 'Delivered' },
    { id: '#1002', date: '2026-02-19', total: 15.50, status: 'Processing' }
  ];

  return (
    <div className="history-page">
      <h1>My Orders</h1>
      {pastOrders.map(order => (
        <div key={order.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '10px', margin: '10px 0' }}>
          <strong>Order {order.id}</strong> - {order.date}
          <p>Total: ${order.total.toFixed(2)} | Status: <span style={{ color: '#ff4757' }}>{order.status}</span></p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;