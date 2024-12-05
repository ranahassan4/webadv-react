import React, { useState } from "react";
import "../CSS/Signin_up.css";
import { useNavigate } from "react-router-dom";

export default function Signin_up({ isModal }) {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const toggleViewLogin = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsRegisterVisible(!isRegisterVisible);
  };

  const toggleViewRegister = () => {
    setIsRegisterVisible(!isRegisterVisible);
    setIsLoginVisible(!isLoginVisible);
  };
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };
  return (
    <div className={`signin_up-modal ${isModal ? "modal-open" : ""}`}>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      <div className="Signin_up">
        <div className="main">
          <div className={`register ${!isLoginVisible ? "active" : ""}`}>
            <form>
              <button
                type="button"
                onClick={toggleViewRegister}
                className="toggle-btn"
              >
                Login
              </button>
              <input type="text" name="txt" placeholder="User name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="number"
                name="broj"
                placeholder="BrojTelefona"
                required
              />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                required
              />
              <button type="submit">Sign up</button>
            </form>
          </div>
          <div className={`login ${isRegisterVisible ? "active" : ""}`}>
            <form>
              <button
                type="button"
                onClick={toggleViewLogin}
                className="toggle-btn"
              >
                Sign up
              </button>
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
