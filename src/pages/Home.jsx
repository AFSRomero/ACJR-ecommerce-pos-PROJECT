import React, { useState } from 'react'; 
import { foodItems } from '../data/mockFood';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import './Menu.css';

const Home = () => {
  // 1. Declare state variables for category and search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Combined Filter logic: Category AND Search text
  const filteredFood = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      {/* --- HERO SECTION START --- */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Foodino</h1>
          <p className="hero-subtitle">Delicious human food, delivered in a dash!</p>
          
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search for fresh meals (e.g. Burger)..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Clear Button: Only shows if there is text in the search bar */}
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>
      {/* --- HERO SECTION END --- */}

      {/* Category Filter Component */}
      <CategoryFilter 
        active={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {/* Food Grid Display */}
      <div className="food-grid">
        {filteredFood.map(item => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>

      {/* "No Results" Message with leafy vibe feedback */}
      {filteredFood.length === 0 && (
        <div className="no-results">
          <p>🌿 No leafy meals match "{searchTerm}"</p>
        </div>
      )}
      
    </div>
  );
};

export default Home;