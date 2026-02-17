function AdminDashboard() {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="card">
        <h3>Total Sales Today</h3>
      </div>

      <div className="card">
        <h3>Inventory Overview</h3>
      </div>

      <div className="card">
        <h3>Low Stock Alerts (EOQ)</h3>
      </div>
    </div>
  );
}

export default AdminDashboard;
