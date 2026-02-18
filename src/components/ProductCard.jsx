const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container" style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
        <img src={product.image} alt={product.name} />
      </div>
      <h3 className="product-title" style={{ fontSize: '16px', margin: '10px 0', height: '40px', overflow: 'hidden' }}>
        {product.name}
      </h3>
      <div className="product-rating" style={{ color: '#ffa41c', fontSize: '14px' }}>
        ★★★★☆ <span style={{ color: '#007185' }}>1,240</span>
      </div>
      <p className="product-price" style={{ fontSize: '21px', fontWeight: '500', margin: '5px 0' }}>
        <span style={{ fontSize: '12px', verticalAlign: 'top' }}>$</span>
        {Math.floor(product.price)}
        <span style={{ fontSize: '12px', verticalAlign: 'top' }}>{(product.price % 1).toFixed(2).substring(1)}</span>
      </p>
      <p style={{ fontSize: '12px', color: '#565959' }}>Ships to Philippines</p>
      <button className="amazon-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;