import React, { useState } from "react";
// import ImagesCard from "../components/ImagesCard";
import "../CSS/Product.css";
import MainImageSrc from "../assets/ah/productPage/mainImage.png";
import Thumbnail1 from "../assets/ah/productPage/thumbnail-1.png";
import Thumbnail2 from "../assets/ah/productPage/thumbnail-2.png";
import Thumbnail3 from "../assets/ah/productPage/thumbnail-3.png";
import MainImageSrc2 from "../assets/ah/productPage2/mainImage.png";
import Thumbnail2_1 from "../assets/ah/productPage2/thumbnail-1.png";
import Thumbnail2_2 from "../assets/ah/productPage2/thumbnail-2.png";
import Thumbnail2_3 from "../assets/ah/productPage2/thumbnail-3.png";

const ProductPage = () => {
  const ImagesInfo = [
    {
      color: "green",
      Main: MainImageSrc,
      Thumbnails: [Thumbnail1, Thumbnail2, Thumbnail3],
    },
    {
      color: "brown",
      Main: MainImageSrc2,
      Thumbnails: [Thumbnail2_1, Thumbnail2_2, Thumbnail2_3],
    },
  ];

  const [colorIndex, setColorIndex] = useState(0);
  const [mainImage, setMainImage] = useState(ImagesInfo[colorIndex].Main);
  const [thumbnails, setThumbnails] = useState(
    ImagesInfo[colorIndex].Thumbnails
  );
  const [size, setSize] = useState("");

  const handleColorChange = (index) => {
    setColorIndex(index);
    const selectedImageInfo = ImagesInfo[index];
    setMainImage(selectedImageInfo.Main);
    setThumbnails(selectedImageInfo.Thumbnails);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleThumbnailClick = (index) => {
    const newThumbnails = [...thumbnails];
    const temp = newThumbnails[index];
    newThumbnails[index] = mainImage;
    setMainImage(temp);
    setThumbnails(newThumbnails);
  };

  const currentImageInfo = ImagesInfo[colorIndex];

  return (
    <div className="product-page">
      <div className="product-images">
        <img src={mainImage} alt="Main product" className="main-image" />

        <div className="thumbnail-images">
          {thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              className="thumbnail-image"
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)} // Swap main image on click
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <p>Men's</p>
        <h1>Z.N.E. Full-Zip Hooded Track Jacket</h1>
        <p className="price">
          <span className="original-price">$48.00</span>{" "}
          <span className="discounted-price">$36.00</span>
        </p>
        <p className="color">Colors</p>
        <div>
          {ImagesInfo.map((info, index) => {
            const isSelected = index === colorIndex;
            return (
              <img
                key={info.id}
                className={`color-image ${isSelected ? "selected" : ""}`}
                src={info.Main}
                alt={`Color Thumbnail ${index + 1}`}
                onClick={() => handleColorChange(index)}
              />
            );
          })}
        </div>
        <div className="size-select">
          <label htmlFor="size">Size: </label>
          <select id="size" value={size} onChange={handleSizeChange}>
            <option value="">Please select</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        <button className="add-to-cart">Add to Cart</button>
        <p className="free-shipping">Free Shipping & Returns*</p>
      </div>
    </div>
  );
};

export default ProductPage;
