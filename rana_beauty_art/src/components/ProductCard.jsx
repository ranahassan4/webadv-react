// src/components/ProductCard.js
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="image-container">
        <Link to="/Products">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3 className="name">{product.name}</h3>
        <p className="price">
          {product.discount ? (
            <>
              <span className="original-price">${product.price}</span>
              <span className="sale-price">${product.discount}</span>
            </>
          ) : (
            `$${product.price}`
          )}
        </p>

        <button className="actions">
          <p className="wishlist">♥</p>
        </button>
      </div>
    </div>
  );
}
