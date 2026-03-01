import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ClientTierLayout from './layouts/ClientTierLayout';
import POSTierLayout from './layouts/POSTierLayout';

import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import POSDashboard from './pages/POSDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Inventory from './pages/Inventory';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= CUSTOMER ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRole="customer">
              <ClientTierLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="history" element={<OrderHistory />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRole="admin">
              <Inventory />
            </ProtectedRoute>
          }
        />

        {/* ================= CASHIER ================= */}
        <Route
          path="/pos"
          element={
            <ProtectedRoute allowedRole="cashier">
              <POSTierLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<POSDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;