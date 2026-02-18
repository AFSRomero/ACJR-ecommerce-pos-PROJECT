import React, { useState } from 'react';
import { Search, Plus, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const InventoryBOM = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data: Finished products and their required components
  const inventory = [
    { id: 'FG-001', name: 'Premium Mechanical Keyboard', stock: 45, status: 'Healthy', components: 8 },
    { id: 'FG-002', name: 'Ergonomic Mouse Z-1', stock: 12, status: 'Low Stock', components: 5 },
    { id: 'FG-003', name: 'Custom Coiled Cable', stock: 0, status: 'Out of Stock', components: 3 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory & BOM</h1>
          <p className="text-gray-500 text-sm">Manage product structures and component availability.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all">
          <Plus size={18} /> Add New Assembly
        </button>
      </header>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search SKU or Product Name..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="bg-gray-50 border-none rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
          <option>All Statuses</option>
          <option>Low Stock</option>
          <option>Healthy</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product SKU</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock Level</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">BOM Items</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-indigo-600">{item.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                   <div className="flex items-center gap-2">
                     <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${item.stock > 20 ? 'bg-green-500' : 'bg-orange-500'}`} 
                          style={{ width: `${Math.min(item.stock, 100)}%` }}
                        ></div>
                     </div>
                     {item.stock} units
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.components} parts</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'Healthy' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status === 'Healthy' ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryBOM;