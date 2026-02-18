import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, Filter, Download } from 'lucide-react';

const TransactionMonitor = () => {
  // Mock transaction data
  const transactions = [
    { id: 'TXN-9021', type: 'Sale', source: 'POS Terminal 1', amount: 124.50, status: 'Completed', time: '2 mins ago' },
    { id: 'TXN-9020', type: 'Refund', source: 'Ecommerce Store', amount: -45.00, status: 'Pending', time: '15 mins ago' },
    { id: 'TXN-9019', type: 'Sale', source: 'Ecommerce Store', amount: 890.00, status: 'Completed', time: '1 hour ago' },
    { id: 'TXN-9018', type: 'Sale', source: 'POS Terminal 2', amount: 12.99, status: 'Flagged', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Monitor</h1>
          <p className="text-gray-500">Real-time audit log of all sales and refunds.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Today's Volume</p>
          <p className="text-xl font-bold text-gray-900 mt-1">$4,230.15</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Average Ticket</p>
          <p className="text-xl font-bold text-gray-900 mt-1">$58.20</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-orange-400">
          <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>
          <p className="text-xl font-bold text-gray-900 mt-1">12 txns</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-red-400">
          <p className="text-xs font-bold text-gray-400 uppercase">Flagged</p>
          <p className="text-xl font-bold text-gray-900 mt-1">1 txn</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${txn.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {txn.amount > 0 ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{txn.id}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">{txn.source}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={14}/> {txn.time}</span>
                    <span className="flex items-center gap-1">•</span>
                    <span className={`font-medium ${
                      txn.status === 'Completed' ? 'text-green-600' : 
                      txn.status === 'Pending' ? 'text-orange-600' : 'text-red-600'
                    }`}>{txn.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${txn.amount > 0 ? 'text-gray-900' : 'text-red-600'}`}>
                  {txn.amount > 0 ? `+$${txn.amount.toFixed(2)}` : `-$${Math.abs(txn.amount).toFixed(2)}`}
                </p>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">View Receipt</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitor;