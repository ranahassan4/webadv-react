import { useState, useEffect } from "react";
import "../CSS/shopPage.css";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

export default function ShopPage() {
  const [Products, setProducts] = useState([]); // Store product data
  const [error, setError] = useState(null); // Store error messages

  // Fetch products
  useEffect(() => {
    fetch(
      "http://localhost/reactttwebprj/react-prj/rana_beauty_art/backend/getProducts.php"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((Products) => {
        setProducts(Products); // Store the Products in state
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Error fetching Products:", err);
        setError(err.message); // Store the error message
      });
  }, []);

  // Get category from URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clothes_category = queryParams.get("categories");
  console.log(clothes_category);

  return (
    <>
      <Navbar />
      <div className="shop-container">
        {error ? (
          <p className="error-message">Error: {error}</p>
        ) : Products.length > 0 ? (
          <div className="product-list">
            {clothes_category === null
              ? Products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : Products.filter(
                  (prod) => prod.category === clothes_category
                ).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        ) : (
          <p className="no-products-message">No products available.</p>
        )}
      </div>
    </>
  );
}
