import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientTierLayout from './layouts/ClientTierLayout';

// Pages
import EcommercePortal from './pages/EcommercePortal';
import EOQAnalytics from './pages/EOQAnalytics';
import PosDashboard from './pages/PosDashboard';
import TransactionMonitor from './pages/TransactionMonitor';

function App() {
  return (
    <Router>
      <ClientTierLayout>
        <Routes>
          <Route path="/" element={<EcommercePortal />} />
          <Route path="/analytics" element={<EOQAnalytics />} />
          <Route path="/pos" element={<PosDashboard />} />
          <Route path="/transactions" element={<TransactionMonitor />} />
        </Routes>
      </ClientTierLayout>
    </Router>
  );
}

export default App;