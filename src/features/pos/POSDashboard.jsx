import { useEffect, useState } from "react";
import api from "@/app/api";
import "./POSDashboard.css";

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

export default function POSDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch products and categories to sync with your database
      const [prodRes, catRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories")
      ]);
      setProducts(prodRes.data);
      setCategories([{ id: "All", name: "All" }, ...catRes.data]);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    setLoading(true);

    try {
      const orderPayload = {
        source: "pos",
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          ingredients: item.ingredients?.map(ing => ({
            id: ing.id,
            version: ing.version // Supports your optimistic locking
          })) || []
        }))
      };

      await api.post("/orders", orderPayload);
      alert("Transaction Successful! Opening Receipt...");
      window.print(); 
      setCart([]);
      fetchInitialData(); 
    } catch (err) {
      const msg = err.response?.data?.message || "Stock conflict detected.";
      alert(`Checkout Failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by search text AND the selected category ID
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category_id == activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pos-container">
      <div className="pos-products no-print-area">
  <div className="pos-search-container">
    <div className="search-input-wrapper">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        className="pos-search-input"
        placeholder="Search SKU or Product Name..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button className="clear-search" onClick={() => setSearch("")}>✕</button>
      )}
    </div>
    
    <div className="pos-category-nav">
      {categories.map(cat => (
        <button 
          key={cat.id}
          className={`category-btn ${activeCategory == cat.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  </div>
        
        <div className="pos-grid">
          {filteredProducts.length === 0 && <p className="no-results-msg">No products found.</p>}
          {filteredProducts.map(p => (
            <div key={p.id} className="pos-card" onClick={() => addToCart(p)}>
              <div className="pos-card-image">
                {p.image ? (
                  <img src={`${STORAGE_URL}${p.image}`} alt={p.name} />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
              </div>
              <div className="pos-card-price">₱{p.price}</div>
              <h4>{p.name}</h4>
              <small>{p.sku || 'No SKU'}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="pos-sidebar receipt-print-area">
        <h3 className="sidebar-title">Foodino Receipt</h3>
        <div className="pos-cart-list">
          {cart.length === 0 && <p className="empty-msg">No items added yet</p>}
          {cart.map(item => (
            <div key={item.id} className="pos-cart-item">
              <div className="item-info">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">{item.name}</span>
              </div>
              <div className="item-actions">
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                <button className="no-print remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="pos-footer">
          <div className="pos-total">
            <span>Total Amount</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
          <button 
            className="pos-checkout-btn no-print" 
            disabled={loading || cart.length === 0}
            onClick={handleCheckout}
          >
            {loading ? "Processing..." : "PAY & PRINT RECEIPT"}
          </button>
        </div>
      </div>
    </div>
  );
}