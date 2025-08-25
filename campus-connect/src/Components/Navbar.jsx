
// Navbar component for the Campus Connect app
// Displays the logo, brand name, and authentication buttons
const Navbar = () => (
  <nav className="navbar">
    {/* Left side: Logo and Brand */}
    <div className="navbar-left">
      {/* Logo: Single letter in a colored box */}
      <div className="logo">C</div>
      {/* Brand name */}
      <span className="brand">Campus Connect</span>
    </div>
    {/* Right side: Login and Sign Up buttons */}
    <div className="navbar-right">
      <button className="login-btn">Login</button>
      <button className="signup-btn">Sign Up</button>
    </div>
  </nav>
);

export default Navbar;
