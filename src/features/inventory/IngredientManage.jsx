import { useEffect, useState } from "react";
import api from "@/app/api";
import { Search, Archive, Package, PlusCircle, RefreshCw } from "lucide-react";
import "./IngredientManage.css";

export default function IngredientManage() {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [form, setForm] = useState({ name: "", stock_quantity: "", unit: "", low_stock_threshold: "" });

  useEffect(() => { fetchIngredients(); }, [showArchived]);

  const fetchIngredients = async () => {
    const endpoint = showArchived ? "/ingredients/archived" : "/ingredients";
    const res = await api.get(endpoint);
    setIngredients(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/ingredients", form);
    setForm({ name: "", stock_quantity: "", unit: "", low_stock_threshold: "" });
    fetchIngredients();
  };

  const filtered = ingredients.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
  <div className="ing-container">
    <header className="ing-header">
      <h2>Stock & Raw Materials</h2>
      <div className="header-actions">
        {/* Only render if searchTerm exists in state */}
        <div className="search-pill">
          <Search size={18} />
          <input 
            placeholder="Search stock..." 
            value={searchTerm || ""} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <button className="toggle-btn" onClick={() => setShowArchived(!showArchived)}>
          <Archive size={16} /> {showArchived ? "Active" : "Archived"}
        </button>
      </div>
    </header>

    {!showArchived && (
      <form className="ing-add-form" onSubmit={handleCreate}>
        <div className="input-group">
          <label>Ingredient Name</label>
          <input placeholder="e.g. Potato" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        </div>
        <div className="input-group">
          <label>Stock</label>
          <input type="number" placeholder="0.00" value={form.stock_quantity} onChange={e => setForm({...form, stock_quantity: e.target.value})} required />
        </div>
        <div className="input-group">
          <label>Unit</label>
          <input placeholder="pcs, g, ml" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} required />
        </div>
        <div className="input-group">
          <label>Alert Level</label>
          <input type="number" placeholder="Min." value={form.low_stock_threshold} onChange={e => setForm({...form, low_stock_threshold: e.target.value})} required />
        </div>
        <button type="submit" className="add-btn">Add</button>
      </form>
    )}

      <div className="ing-grid">
        {filtered.map(i => (
          <div key={i.id} className={`ing-card ${Number(i.stock_quantity) <= Number(i.low_stock_threshold) ? 'low-stock' : ''}`}>
            <div className="card-top">
              <h4>{i.name}</h4>
              <span className="v-badge">v{i.version || 1}</span>
            </div>
            <div className="card-qty">
              <span className="qty-val">{i.stock_quantity}</span>
              <span className="qty-unit">{i.unit} left</span>
            </div>
            <div className="card-footer">
               <button className="btn-text">Edit</button>
               <button className="btn-text danger" onClick={() => archive(i.id)}>Archive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}