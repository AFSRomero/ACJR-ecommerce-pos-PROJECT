import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/app/api";
import { useCart } from "@/auth/CartContext"; // Use the global cart
import "./Home.css";

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

export default function Home() {
  const navigate = useNavigate();
  // Pulling global logic from your CartContext.jsx
  const { cart, addToCart, removeFromCart, cartTotal } = useCart();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Now dynamic
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories")
      ]);
      setProducts(prodRes.data);
      // We manually add "All" to the list of categories fetched from DB
      setCategories([{ id: "All", name: "All" }, ...catRes.data]);
    } catch (err) {
      console.error("Error loading menu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Optimized filtering logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category_id == activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-wrapper">
      <header className="home-hero">
        <div className="hero-content">
          <h1>Freshness Delivered.</h1>
          <p>Real-time gourmet selection from our kitchen to your doorstep.</p>

          <div className="hero-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search our menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`tab-btn ${activeCategory == cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="menu-container">
        <div className="menu-header">
          <h2>{activeCategory === "All" ? "Full" : ""} Selection</h2>
          <span>{filteredProducts.length} items found</span>
        </div>

        {loading ? (
          <div className="status-msg">Heating up the grill...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card-img-wrapper">
                  {product.image ? (
                    <img src={`${STORAGE_URL}${product.image}`} alt={product.name} />
                  ) : (
                    <div className="img-placeholder">🌿</div>
                  )}
                  {/* Display category name from the relationship */}
                  <span className="category-tag">{product.category?.name}</span>
                </div>

                <div className="card-info">
                  <div className="card-text">
                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {product.description || "Freshly prepared with premium ingredients."}
                    </p>
                  </div>

                  <div className="card-footer">
                    <span className="price">
                      ₱{Number(product.price).toLocaleString()}
                    </span>
                    <button 
                      className="add-btn" 
                      onClick={() => {
                        addToCart(product);
                        setIsCartOpen(true);
                      }}
                    >
                      <span className="plus-icon">+</span> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="status-msg">No items found in this category yet.</div>
        )}
      </main>

      {/* CART SIDEBAR - Now using Global Context */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Order</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">🛒</span>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.qty}x ₱{Number(item.price).toLocaleString()}</p>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <div className="item-actions">
                  <span className="item-total">
                    ₱{(item.qty * item.price).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer-sticky">
            <div className="total-row">
              <span>Total:</span>
              <span>₱{cartTotal.toLocaleString()}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
    </div>
  );
}