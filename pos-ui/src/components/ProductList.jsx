import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      {products.map(product => (
        <button
          key={product.id}
          onClick={() => addToCart(product)}
        >
          {product.name} - ₱{product.price}
        </button>
      ))}
    </div>
  );
}

export default ProductList;
