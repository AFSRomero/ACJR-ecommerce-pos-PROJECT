import React from 'react';

const InventoryBOM = () => {
  const inventory = [
    { id: 1, item: "Beef Patties", qty: 45, unit: "pcs" },
    { id: 2, item: "Pizza Dough", qty: 20, unit: "kg" },
    { id: 3, item: "Buns", qty: 60, unit: "pcs" }
  ];

  return (
    <div className="admin-page">
      <h2>Kitchen Inventory (BOM)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Material</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(i => (
            <tr key={i.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{i.item}</td>
              <td style={{ padding: '10px' }}>{i.qty} {i.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryBOM;