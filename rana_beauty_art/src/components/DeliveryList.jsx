import React, { useState } from "react";
import "../CSS/DeliveryList.css";
import T_shirt from "../assets/ahmad/T-shirt.png";
import Delete from "../assets/ahmad/Delete.svg";

const deliveryInfo = [
  {
    Product_id: 0,
    image: T_shirt,
    name: "Shirt",
    about: "",
    productSizes: "M",
    productColor: "Green",
    Username: "John Doe",
    email: "ah@gmail.com",
    phone: "1234567890",
    status: "not delivered",
    creditCardNumber: "**** **** **** 1234",
    address: "123 Green St, Cityville",
  },
  {
    Product_id: 1,
    image: T_shirt,
    name: "Shirt",
    about: "",
    productSizes: "M",
    productColor: "Green",
    Username: "Jane Smith",
    email: "jsmith@gmail.com",
    phone: "9876543210",
    status: "delivered",
    creditCardNumber: "**** **** **** 5678",
    address: "456 Blue St, Townsville",
  },
  {
    Product_id: 2,
    image: T_shirt,
    name: "Shirt",
    about: "",
    productSizes: "M",
    productColor: "Green",
    Username: "Alice Johnson",
    email: "alice@gmail.com",
    phone: "4567890123",
    status: "not delivered",
    creditCardNumber: "**** **** **** 9012",
    address: "789 Yellow St, Villageville",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(deliveryInfo);

  const handleDelete = (Product_id) => {
    const updatedProducts = products.filter(
      (product) => product.Product_id !== Product_id
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="products-list">
      <header className="product-header">
        <h2>Delivery Information</h2>
      </header>

      <div className="product-container">
        <div className="product-headers">
          <span className="item">Item</span>
          <span>ID</span>
          <span>Username</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Size</span>
          <span>Color</span>
          <span>Status</span>
          <span>Address</span>
        </div>

        {products.map((product) => (
          <div key={product.Product_id} className="product-row">
            <div className="product-item">
              <span className="type">Item</span>
              <img src={product.image} alt={product.name} />
              <div className="product-text">
                <p className="name">{product.name}</p>
                <p className="about">{product.about || "No description"}</p>
              </div>
            </div>
            <span>
              <span className="type">ID</span> {product.Product_id}
            </span>
            <span>
              <span className="type">Username</span> {product.Username}
            </span>
            <span>
              <span className="type">Email</span> {product.email}
            </span>
            <span>
              <span className="type">Phone</span> {product.phone}
            </span>
            <span>
              <span className="type">Size</span> {product.productSizes}
            </span>
            <span>
              <span className="type">Color</span> {product.productColor}
            </span>
            <span
              className={`status ${
                product.status === "delivered" ? "delivered" : "not-delivered"
              }`}
            >
              <span className="type">Status</span> {product.status}
            </span>
            <span>
              <span className="type">Address</span> {product.address}
            </span>

            <button
              className="button"
              onClick={() => handleDelete(product.Product_id)}
            >
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
