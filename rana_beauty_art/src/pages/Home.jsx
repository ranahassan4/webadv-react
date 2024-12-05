// import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import "../CSS/Home.CSS";
import Navbar from "../components/Navbar";
import Rings from "../components/Rings";
import homImage from "../assets/hom.jpg";
import necklaceImage from "../assets/ProductImages/necklace/nickles1.jpg";
import PiercingImage from "../assets/ProductImages/bracelet/bracelet1.jpg";
import whatsappIcon from "../assets/whicon.gif";
// Import useNavigate

const Home = () => {
  const textSection = useRef(null);
  const zoomImage = useRef(null);
  const necklaceText = useRef(null);
  const shopNowImage = useRef(null);
  const piercingImage = useRef(null);

  useEffect(() => {
    const textSection2 = textSection.current;
    setTimeout(() => {
      if (textSection2) textSection2.classList.add("animate");
    }, 500);

    const zoomImage2 = zoomImage.current;
    setTimeout(() => {
      if (zoomImage2) zoomImage2.classList.add("loaded");
    }, 300);

    const necklaceText2 = necklaceText.current;
    setTimeout(() => {
      if (necklaceText2) necklaceText2.classList.add("animate-necklace-text");
    }, 500);

    const shopNowImage2 = shopNowImage.current;
    setTimeout(() => {
      if (shopNowImage2) shopNowImage2.classList.add("animate-shop-now");
    }, 700);

    const piercingImage2 = piercingImage.current;
    setTimeout(() => {
      if (piercingImage2) piercingImage2.classList.add("animate-piercing");
    }, 1000);
  }, []);

  // Function to navigate to a specific page

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="image-section">
        <img
          ref={zoomImage}
          className="zoom-out-image"
          src={homImage}
          alt="Diamond Background"
        />
        <div className="image-overlay">
          <h1>Welcome to Rana Store</h1>
          <p>
            The finest collection of diamonds and jewelry for every occasion.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div ref={textSection} className="text-section">
        <h2 className="luxury-title">
          Where the Art of Elegance Meets the Brilliance of Diamonds
        </h2>
        <p className="luxury-description">
          We curate only the finest, most exquisite diamonds, handpicked for
          their unparalleled brilliance and timeless beauty. Each piece in our
          collection reflects a dedication to craftsmanship and perfection,
          offering a luxurious experience that transcends trends. Whether youre
          celebrating a special moment or indulging in something extraordinary,
          our diamonds promise to elevate your every occasion. Discover the art
          of luxury, where elegance meets sophistication.
        </p>
      </div>

      {/* Carousel Section */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <a
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></a>
          <a
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></a>
          <a
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></a>
        </div>
      </div>

      {/* Necklace Section */}
      <div ref={necklaceText} className="necklace-section">
        <h2 className="animated-necklace-text">
          Explore the Elegance of Necklaces
        </h2>
      </div>

      {/* Shop Now Section */}
      <div className="shop-now-section">
        <div ref={shopNowImage} className="shop-now-container">
          <img src={necklaceImage} alt="Shop Now" className="shop-now-image" />
          <div className="shop-now-overlay">
            <h3>Update Your Look</h3>
            <Link
              to={`/shop?categories=${"necklace"}`}
              className="btn btn-primary no-underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <Rings />

      {/* Piercing Section */}
      <div className="piercing-section">
        <div className="piercing-container">
          <h2 className="piercing-title">Discover the Art of Piercing</h2>
          <p className="piercing-description">
            Elevate your style with our unique collection of piercings. Each
            piece is crafted with precision and designed to make a statement.
          </p>
          <div className="shop-now-section">
            <div ref={shopNowImage} className="shop-now-container">
              <img
                src={PiercingImage}
                alt="Shop Now"
                className="shop-now-image"
              />
              <div className="shop-now-overlay">
                <h3>Update Your Look</h3>
                <Link
                  to={`/shop?categories=${"bracelet"}`}
                  className="btn btn-primary no-underline"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="whatsapp-button">
        <a
          href="https://wa.me/+96181039584"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <img src={whatsappIcon} alt="WhatsApp Chat" />
        </a>
      </div>
    </div>
  );
};

export default Home;
