import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo-container">
                <div className="logo-box">C</div>
                <h2 className="logo-text">Campus Connect</h2>
            </div>

            {/* Buttons */}
            <div className="nav-buttons">
                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>
                <button className="signup-btn" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar; 