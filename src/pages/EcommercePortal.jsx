import ProductCard from '../components/ProductCard';

const EcommercePortal = () => {
  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 299.00, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Minimalist Leather Watch", price: 150.00, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Smart Home Hub", price: 89.99, category: "Gadgets", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500" },
    { id: 4, name: "Ergonomic Desk Chair", price: 450.00, category: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500" },
  ];

  return (
    <div className="ecommerce-container">
      {/* 1. Amazon-style Hero Banner */}
      <div className="hero-section" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), var(--bg-gray)), url("https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg")',
        backgroundSize: 'cover',
        height: '300px',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '40px'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          backgroundColor: 'white', 
          padding: '20px',
          borderRadius: '4px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          Big Deals on Tech & Furniture
        </h1>
      </div>

      {/* 2. Amazon-style Product Grid */}
      <div className="grid" style={{ marginTop: '-100px', position: 'relative', zIndex: '2' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default EcommercePortal;