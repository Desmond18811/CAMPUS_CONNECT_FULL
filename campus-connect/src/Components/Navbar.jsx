import "./../styles/Navbar.css"; // import CSS file

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-box">C</div>
        <h2 className="logo-text">Campus Connect</h2>
      </div>

      {/* Buttons */}
      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
