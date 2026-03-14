import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Monitor, 
  LayoutGrid, 
  History, 
  Wheat, 
  Activity 
} from 'lucide-react'; // Modern icons
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const modules = [
  { 
    id: 'inventory', 
    title: 'Live Inventory', 
    desc: 'Monitor stock & alerts', 
    icon: <Package size={24} />, 
    color: '#3b82f6', 
    path: '/inventory' // Matches <Route path="/inventory" />
  },
  { 
    id: 'pos', 
    title: 'POS Terminal', 
    desc: 'Open cashier interface', 
    icon: <Monitor size={24} />, 
    color: '#10b981', 
    path: '/pos' // Matches <Route path="/pos" />
  },
  { 
    id: 'menu', 
    title: 'Menu Manager', 
    desc: 'Build recipes & products', 
    icon: <LayoutGrid size={24} />, 
    color: '#f59e0b', 
    path: '/admin/products' // Matches <Route path="/admin/products" />
  },
  { 
    id: 'orders', 
    title: 'Order History', 
    desc: 'View all transactions', 
    icon: <History size={24} />, 
    color: '#8b5cf6', 
    path: '/admin/orders' // Matches <Route path="/admin/orders" />
  },
  { 
    id: 'ingredients', 
    title: 'Ingredients', 
    desc: 'Manage raw materials', 
    icon: <Wheat size={24} />, 
    color: '#ec4899', 
    path: '/admin/ingredients' // Matches <Route path="/admin/ingredients" />
  },
];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-title">
          <h1>System Administration</h1>
          <p><Activity size={16} className="pulse" /> Real-Time Event-Driven Architecture Control Panel</p>
        </div>
      </header>

      {/* NEW: Quick Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Active Orders</span>
          <strong>12</strong>
        </div>
        <div className="stat-card">
          <span>Low Stock Alerts</span>
          <strong className="warning">3</strong>
        </div>
        <div className="stat-card">
          <span>Today's Revenue</span>
          <strong>₱14,250</strong>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((m) => (
          <div 
            key={m.id} 
            className="module-card" 
            onClick={() => navigate(m.path)}
            style={{ '--accent-color': m.color }}
          >
            <div className="icon-wrapper">
              {m.icon}
            </div>
            <div className="module-info">
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
            <div className="arrow-indicator">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}