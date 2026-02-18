import React, { useState } from 'react';
import { Info, Calculator, TrendingUp, Package } from 'lucide-react';
import MetricCard from '../components/MetricCard';

const EOQAnalytics = () => {
  const [demand, setDemand] = useState(10000);
  const [setupCost, setSetupCost] = useState(50);
  const [holdingCost, setHoldingCost] = useState(2);

  // EOQ Calculation Logic
  const eoq = Math.sqrt((2 * demand * setupCost) / holdingCost).toFixed(0);
  const annualOrders = (demand / eoq).toFixed(1);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Intelligence</h1>
          <p className="text-gray-500">Calculate the Economic Order Quantity to optimize stock costs.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
          <Calculator size={18} />
          Save Report
        </button>
      </header>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Optimal Order Quantity" value={eoq} unit="Units" icon={Package} color="text-blue-600" />
        <MetricCard title="Orders Per Year" value={annualOrders} unit="Times" icon={TrendingUp} color="text-green-600" />
        <MetricCard title="Cycle Stock" value={(eoq / 2).toFixed(0)} unit="Units" icon={Info} color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Settings size={18} /> Calculation Variables
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Demand (D)</label>
              <input 
                type="number" value={demand} onChange={(e) => setDemand(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Setup Cost per Order (S)</label>
              <input 
                type="number" value={setupCost} onChange={(e) => setSetupCost(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holding Cost per Unit (H)</label>
              <input 
                type="number" value={holdingCost} onChange={(e) => setHoldingCost(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Visual Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-gray-400 border-dashed border-2">
           <p className="mb-2 italic text-sm text-center">Optimization Curve (Relationship between Ordering and Holding Costs)</p>
           
           <p className="mt-4 text-xs text-gray-500">The intersection represents your minimum total cost point ($Q$).</p>
        </div>
      </div>
    </div>
  );
};

export default EOQAnalytics;