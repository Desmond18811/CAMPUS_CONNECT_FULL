import React from "react";
import "../App.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <div className="logo">C</div>
      <span className="brand">Campus Connect</span>
    </div>
    <div className="navbar-right">
      <button className="login-btn">Login</button>
      <button className="signup-btn">Sign Up</button>
    </div>
  </nav>
);

export default Navbar;
