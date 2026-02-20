import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientTierLayout from './layouts/ClientTierLayout';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import InventoryBOM from './pages/InventoryBOM';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientTierLayout />}>
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="inventory" element={<InventoryBOM />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;