import React from 'react';
import './CategoryFilter.css';

const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Salads', 'Drinks'];

const CategoryFilter = ({ active, onSelect }) => {
  return (
    <div className="filter-container">
      {categories.map((cat) => (
        <button
          key={cat}
          // If the button is active, it gets both 'stone-btn' and 'active' classes
          className={`stone-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;