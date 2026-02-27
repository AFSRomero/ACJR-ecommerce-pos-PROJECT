import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientTierLayout from './layouts/ClientTierLayout';
import POSTierLayout from './layouts/POSTierLayout';

import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import InventoryBOM from './pages/InventoryBOM';
import POSDashboard from './pages/POSDashboard';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public E-Commerce Node */}
        <Route path="/" element={<ClientTierLayout />}>
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="history" element={<OrderHistory />} />
        </Route>

        {/* Inventory Admin */}
        <Route path="/inventory" element={<InventoryBOM />} />

        {/* POS Terminal */}
        <Route path="/pos" element={<POSTierLayout />}>
          <Route index element={<POSDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;