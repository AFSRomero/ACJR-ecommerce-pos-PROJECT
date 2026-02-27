import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import api from '../services/api';
import './Menu.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredFood = products.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category?.name === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">

      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Foodino</h1>
          <p className="hero-subtitle">
            Delicious human food, delivered in a dash!
          </p>

          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search for meals..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}

            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <CategoryFilter
        active={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="food-grid">
        {filteredFood.map(item => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>

      {filteredFood.length === 0 && (
        <div className="no-results">
          <p>No meals found</p>
        </div>
      )}
    </div>
  );
};

export default Home;