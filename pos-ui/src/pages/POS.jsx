import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import echo from "../services/socket";

useEffect(() => {
  echo.channel("inventory")
      .listen("InventoryUpdated", (e) => {
          fetchProducts();
      });
}, []);

function POS() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/products");
    setProducts(response.data);
  };

  return (
    <div className="container">
      <h1>Point of Sale</h1>
      <div className="row">
        <div className="col-8">
          <ProductList products={products} />
        </div>
        <div className="col-4">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default POS;
