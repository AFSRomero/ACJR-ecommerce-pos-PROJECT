import React from 'react';
import { Search, ShoppingCart, MapPin, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <div className="header-wrapper">
      {/* Top Main Nav */}
      <header style={{
        backgroundColor: '#131921',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: 'white',
        height: '60px'
      }}>
        {/* Logo Placeholder */}
        <div style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
          <span style={{ color: 'white' }}>ShopAdmin</span>
          <span style={{ color: '#febd69' }}>.pro</span>
        </div>

        {/* Deliver to Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '12px' }}>
          <MapPin size={18} style={{ marginTop: '8px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#ccc' }}>Deliver to</span>
            <span style={{ fontWeight: 'bold' }}>Philippines</span>
          </div>
        </div>

        {/* Big Search Bar */}
        <div style={{ 
          display: 'flex', 
          flex: 1, 
          height: '40px', 
          borderRadius: '4px', 
          overflow: 'hidden' 
        }}>
          <select style={{ 
            backgroundColor: '#f3f3f3', 
            border: 'none', 
            padding: '0 10px', 
            borderRight: '1px solid #ddd',
            cursor: 'pointer'
          }}>
            <option>All</option>
          </select>
          <input 
            type="text" 
            style={{ flex: 1, border: 'none', padding: '0 10px', outline: 'none' }} 
            placeholder="Search ShopAdmin.pro"
          />
          <button style={{ 
            backgroundColor: '#febd69', 
            border: 'none', 
            padding: '0 15px', 
            cursor: 'pointer' 
          }}>
            <Search color="#333" size={22} />
          </button>
        </div>

        {/* Right Side Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ cursor: 'pointer' }}>
            <p style={{ margin: 0 }}>Hello, Sign in</p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Account & Lists <ChevronDown size={12} inline /></p>
          </div>
          <div style={{ cursor: 'pointer' }}>
            <p style={{ margin: 0 }}>Returns</p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>& Orders</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', cursor: 'pointer', position: 'relative' }}>
            <span style={{ 
              position: 'absolute', 
              top: '-5px', 
              right: '18px', 
              color: '#f08804', 
              fontWeight: 'bold',
              fontSize: '16px'
            }}>0</span>
            <ShoppingCart size={32} />
            <span style={{ fontWeight: 'bold', marginBottom: '4px' }}>Cart</span>
          </div>
        </div>
      </header>

      {/* Bottom Sub-Nav (The Blue Bar) */}
      <nav style={{
        backgroundColor: '#232f3e',
        padding: '8px 20px',
        color: 'white',
        display: 'flex',
        gap: '15px',
        fontSize: '14px',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span>☰ All</span>
        </div>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Today's Deals</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Customer Service</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Registry</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Gift Cards</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Sell</a>
      </nav>
    </div>
  );
};

export default Header;