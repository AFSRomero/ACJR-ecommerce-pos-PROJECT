import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./features/ecommerce/Home";
import Checkout from "./features/ecommerce/Checkout";
import POSDashboard from "./features/pos/POSDashboard";
import InventoryView from "./features/inventory/InventoryView";
import IngredientManage from "./features/inventory/IngredientManage";
import ProductManage from "./features/products/ProductManage";
import OrderHistory from "./features/orders/OrderHistory";
import AdminDashboard from "./features/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pos" element={<POSDashboard />} />
        <Route path="/inventory" element={<InventoryView />} />
        <Route path="/dashboard" element={<AdminDashboard />} /> 
        <Route path="/admin/ingredients" element={<IngredientManage />} />
        <Route path="/admin/products" element={<ProductManage />} />
        <Route path="/admin/orders" element={<OrderHistory />} />
      </Route>

      <Route path="*" element={
        <div style={{ padding: "100px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1 style={{ fontSize: "4rem", color: "#1a3c34" }}>404</h1>
          <p>Oops! This page is cooking in another kitchen.</p>
          <button 
            onClick={() => window.location.href = "/"}
            style={{ padding: "10px 20px", background: "#1a3c34", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Back to Home
          </button>
        </div>
      } />
    </Routes>
  );
}
export default App;