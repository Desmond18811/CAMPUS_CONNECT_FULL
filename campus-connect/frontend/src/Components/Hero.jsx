import Lottie from "lottie-react";
import animationData from "../assets/File Search.json";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate("/signup")
  }
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left side - text */}
        <div className="hero-content">
          <h1 className="hero-title">Your Academic Hub-</h1>
          <h1 className="hero-title">Past Questions, Projects,</h1>
          <h1 className="hero-title">Materials in One Place</h1>
          <p className="hero-subtitle">
            Access, organize, and download academic materials, past questions, and study resources from your school effortlessly.
          </p>

          <div className="hero-btn-wrapper">
            <button className="hero-btn " onClick={handleSignUp}>Get Started</button>
          </div>
        </div>

        {/* Right side - animation */}
        <div className="hero-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;