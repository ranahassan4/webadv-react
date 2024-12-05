import React, { useState } from "react";
import "../CSS/Rings.css";
import solitaireImage from "../assets/ProductImages/solitar/solitar1.jpg"; // Example import, replace with your actual paths
import weddingImage from "../assets/ProductImages/weddr/weddingring1.jpg";
import diamondImage from "../assets/ProductImages/twodiamond/tdiamond1.jpg";
import { Link } from "react-router-dom";

export default function Signin_up() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { src: solitaireImage, alt: "Solitaire Rings", link: "solitar ring" },
    { src: weddingImage, alt: "Wedding Rings", link: "wedding ring" },
    { src: diamondImage, alt: "2 Diamond Rings", link: "two diamond" },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className="rings-container">
        <button className="move-left" onClick={handlePrev}>
          &lt;
        </button>
        <div className="rings">
          {images.map((image, index) => (
            <div
              className={`shop-now-container carousel-item ${
                index === activeIndex
                  ? "active"
                  : index === (activeIndex - 1 + images.length) % images.length
                  ? "prev"
                  : "next"
              }`}
              key={index}
            >
              <img
                src={image.src}
                className="shop-now-image d-block carousel-img mx-auto"
                alt={image.alt}
              />
              <div className="shop-now-overlay carousel-caption ">
                <h5>{image.alt}</h5>
                <Link to={`/shop?categories=${image.link}`} className="btn ">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="move-right" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </>
  );
}
