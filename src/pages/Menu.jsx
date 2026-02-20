import './Menu.css';
import FoodCard from '../components/FoodCard';

const Menu = ({ addToCart }) => {
  return (
    <div className="menu-container">
      <h2 className="category-title">Popular Items</h2>
      {menuData.map(item => (
        <FoodCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
};

  export default Menu;