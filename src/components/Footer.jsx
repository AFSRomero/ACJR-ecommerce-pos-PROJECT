import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Separate CSS

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">Foodino🌿</h2>
          <p className="footer-tagline">
            Freshly picked, human-approved meals delivered to your door.
          </p>
        </div>
        
        <div className="footer-links">
          <Link to="/">Menu</Link>
          <Link to="/history">Order Tracking</Link>
          <Link to="/inventory">Partner Login</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        © 2026 Foodino. All rights reserved. 🥬
      </div>
    </footer>
  );
};

export default Footer;