import { Link } from "react-router-dom";
import "../CSS/navBar.css";
import logo from "../assets/necklace.gif";
import user from "../assets/ahmad/User.svg";
//PP
const Navbar = () => {
  return (
    <div>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>
          🎄 <strong>Its Christmas!</strong> During December, enjoy{" "}
          <strong>33% off</strong> on Solitaire Rings and Necklaces! 🎁
        </p>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>

          <h5>The art of beauty</h5>
        </div>

        <div className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/women">Trend</Link>
          <Link to="/kids">Seasons</Link>
          <Link to="/sale">Focus</Link>
        </div>

        <div className="nav-actions">
          <Link to="/Signin_up">
            <img src={user} alt="user logo" />
          </Link>

          <input
            type="text"
            className="search-bar"
            placeholder="Search for items..."
          />

          <Link to="/Cart" className="cart-button">
            <span> 🛒 </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
