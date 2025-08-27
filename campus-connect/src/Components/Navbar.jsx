
// Navbar component for the Campus Connect app
// Displays the logo, brand name, and authentication buttons
const Navbar = () => (
  <nav className="navbar">
    {/* Left side: Logo and Brand */}
    <div className="navbar-left">
  {/* Logo: Double letter for Campus Connect */}
  <div className="logo">CC</div>
      {/* Brand name */}
      <span className="brand">Campus Connect</span>
    </div>
    {/* Right side: Theme toggle and authentication buttons */}
    <div className="navbar-right">
      <div className="theme-toggle-group">
        <button
          className="theme-btn"
          id="theme-toggle-btn"
          onClick={() => {
            const current = document.body.getAttribute('data-theme');
            document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
          }}
        >
          {document.body.getAttribute('data-theme') === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>
      <button className="login-btn">Login</button>
      <button className="signup-btn">Sign Up</button>
    </div>
  </nav>
);

export default Navbar;
