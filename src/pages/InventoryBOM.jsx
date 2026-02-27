import React, { useEffect, useState } from 'react';
import echo from '../services/echo';
import api from '../services/api';

const InventoryBOM = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const res = await api.get('/ingredients');
      setInventory(res.data);
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    echo.channel("inventory")
      .listen(".inventory.updated", (e) => {
        setInventory(prev =>
          prev.map(item =>
            item.id === e.ingredient.id ? e.ingredient : item
          )
        );
      });

    return () => {
      echo.leave("inventory");
    };
  }, []);

  return (
    <div className="admin-page">
      <h2>Kitchen Inventory</h2>

      <table style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.stock_quantity} {i.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryBOM;