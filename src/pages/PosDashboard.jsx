import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, User, CreditCard } from 'lucide-react';

const PosDashboard = () => {
  const [cart, setCart] = useState([]);
  
  // Mock products for the POS
  const products = [
    { id: 1, name: 'Latte', price: 4.50, category: 'Beverage', color: 'bg-orange-100' },
    { id: 2, name: 'Croissant', price: 3.75, category: 'Food', color: 'bg-yellow-100' },
    { id: 3, name: 'Espresso', price: 2.50, category: 'Beverage', color: 'bg-brown-100' },
    { id: 4, name: 'Blueberry Muffin', price: 4.00, category: 'Food', color: 'bg-blue-100' },
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* LEFT: Product Selection */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search items or scan barcode..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
          {products.map((p) => (
            <button 
              key={p.id}
              onClick={() => addToCart(p)}
              className="p-4 bg-white rounded-xl shadow-sm border border-transparent hover:border-indigo-500 hover:shadow-md transition-all text-left flex flex-col justify-between h-32"
            >
              <span className="text-xs font-bold text-gray-400 uppercase">{p.category}</span>
              <span className="font-semibold text-gray-800">{p.name}</span>
              <span className="text-indigo-600 font-bold">${p.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Cart & Checkout */}
      <div className="w-96 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold flex items-center gap-2">
            <ShoppingCart size={20} className="text-indigo-600" /> Current Order
          </h2>
          <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">
            {cart.length} Items
          </span>
        </div>

        {/* Scrollable Cart List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm mt-2">Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex justify-between items-center group">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Calculation Summary */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            disabled={cart.length === 0}
            className="w-full mt-4 bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <CreditCard size={20} />
            Complete Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosDashboard;