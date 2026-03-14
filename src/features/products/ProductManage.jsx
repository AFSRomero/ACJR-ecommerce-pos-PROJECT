import React, { useState } from 'react';
import './ProductManage.css';
import { Save, Image as ImageIcon, Archive, PlusCircle } from 'lucide-react';

export default function ProductManage() {
  return (
    <div className="manage-container">
      <header className="manage-header">
  <div className="header-title">
    <h1>Menu Management</h1>
    <p>Create and update your digital menu items</p>
  </div>
  <button className="btn-archive">
    <Archive size={18} /> View Archived
  </button>
</header>

      <div className="manage-grid">
        {/* Left Side: Form Details */}
        <div className="details-card">
          <h3 className="section-title">Item Details</h3>
          <div className="form-grid">
            <div className="input-group full">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Cheese Burger" />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select>
                <option>Select Category</option>
                <option>Snacks</option>
                <option>Drinks</option>
                <option>Meals</option>
              </select>
            </div>

            <div className="input-group">
              <label>SKU</label>
              <input type="text" placeholder="FD-1001" />
            </div>

            <div className="input-group full">
              <label>Price (₱)</label>
              <input type="number" placeholder="0.00" />
            </div>

            <div className="input-group full">
              <label>Description</label>
              <textarea placeholder="Describe the item ingredients or taste..."></textarea>
            </div>

            <div className="input-group full">
              <label>Product Image</label>
              <div className="file-upload">
                <ImageIcon size={20} />
                <span>Choose File or Drag & Drop</span>
                <input type="file" />
              </div>
            </div>
          </div>

          <div className="ingredients-section">
            <h3 className="section-title">Ingredients Used</h3>
            <button className="btn-add-ingredient">
              <PlusCircle size={16} /> Add Ingredient Link
            </button>
            {/* Logic for linked ingredients would go here */}
          </div>

          <button className="btn-save">
            <Save size={18} /> Save Product
          </button>
        </div>

        {/* Right Side: Preview/Active Menu */}
        <div className="preview-card">
          <h3 className="section-title">Active Menu Preview</h3>
          <div className="preview-placeholder">
            <div className="empty-preview">
              <ImageIcon size={48} />
              <p>Your product preview will appear here as you type.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}