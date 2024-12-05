import React, { useState } from "react";
import "../CSS/Cart.css";
import T_shirt from "../assets/ahmad/T-shirt.png";
import { useNavigate } from "react-router-dom";
import Close from "../assets/ahmad/Close.svg";

const Cart = ({ isModal }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 0,
      name: "Basic T-shirt",
      color: "Grey",
      size: "M",
      price: 49,
      quantity: 1,
      image: T_shirt,
    },
    {
      id: 1,
      name: "Basic T-shirt",
      color: "Grey",
      size: "M",
      price: 49,
      quantity: 1,
      image: T_shirt,
    },
    {
      id: 1,
      name: "Basic T-shirt",
      color: "Grey",
      size: "M",
      price: 49,
      quantity: 1,
      image: T_shirt,
    },
    {
      id: 1,
      name: "Basic T-shirt",
      color: "Grey",
      size: "M",
      price: 49,
      quantity: 1,
      image: T_shirt,
    },
  ]);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1); // Closes the modal and navigates back
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <div className={`cart-modal ${isModal ? "modal-open" : ""}`}>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      <div className="cart">
        <h1>Cart</h1>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-info">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="details">
                <p>{item.name}</p>
                <p>COLOR: {item.color}</p>
                <p>SIZE: {item.size}</p>
                <div className="quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                  <span className="price">x {item.price} $</span>
                </div>
              </div>
            </div>
            <p className="Totalprice"> {item.price * item.quantity} USD</p>
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item.id)}
            >
              <img src={Close} alt="close symbol" />
            </button>
          </div>
        ))}

        <div className="total">
          <p className="total-price">Total quantity: 3</p>

          <p className="total-quantity">Total price: 98 USD</p>
        </div>

        <div className="navbtn">
          <button className="btn" onClick={handleCloseModal}>
            &lt; Continue Shopping
          </button>
          <button className="btn"> Checkout &gt; </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
