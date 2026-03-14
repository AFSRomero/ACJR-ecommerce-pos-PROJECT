import { useEffect, useState } from "react";
import api from "@/app/api";
import echo from "@/app/echo";
import "./InventoryView.css";

export default function InventoryView() {
  const [ingredients, setIngredients] = useState([]);
  const [stats, setStats] = useState({ total: 0, lowStock: 0 });

  useEffect(() => {
    fetchIngredients();

    const channel = echo.channel("inventory")
      .listen(".inventory.updated", (e) => {
        setIngredients(prev =>
          prev.map(i => i.id === e.ingredient.id ? e.ingredient : i)
        );
      })
      .listen(".inventory.low_stock", (e) => {
        console.warn(`Low Stock Alert: ${e.ingredient_name}`);
      });

    return () => {
      channel.stopListening(".inventory.updated");
      channel.stopListening(".inventory.low_stock");
    };
  }, []);

  useEffect(() => {
    const low = ingredients.filter(i => i.stock_quantity <= i.low_stock_threshold).length;
    setStats({ total: ingredients.length, lowStock: low });
  }, [ingredients]);

  const fetchIngredients = async () => {
    try {
      const res = await api.get("/ingredients");
      setIngredients(res.data);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
    }
  };

  return (
    <div className="inventory-dashboard">
      <div className="inventory-header">
        <h2>Live Inventory Status</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-label">Low Stock Alerts</span>
            <span className="stat-value">{stats.lowStock}</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Ingredient Name</th>
              <th>Current Stock</th>
              <th>Unit</th>
              <th>Threshold</th>
              <th>Status</th>
              <th>System Version</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(i => {
              const isLow = i.stock_quantity <= i.low_stock_threshold;
              return (
                <tr key={i.id} className={isLow ? "row-warning" : ""}>
                  <td className="font-bold">{i.name}</td>
                  <td>
                    <span className={`stock-badge ${isLow ? 'danger' : 'success'}`}>
                      {i.stock_quantity}
                    </span>
                  </td>
                  <td>{i.unit}</td>
                  <td>{i.low_stock_threshold}</td>
                  <td>
                    {isLow ? (
                      <span className="status-tag critical">Needs Restock</span>
                    ) : (
                      <span className="status-tag healthy">Healthy</span>
                    )}
                  </td>
                  <td className="version-cell">v{i.version}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}