import Lottie from "lottie-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import animationData from "../assets/Question Mark For The Internet Stud.json";
import "../styles/Why.css";

function TrendingResources() {
  return (
    <section className="why">
      <div className="why-container">
        {/* Left Animation */}
        <div className="why-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {/* Right Content */}
        <div className="why-content">
          <div className="header">
            <h1 className="why-title">Why Campus Connect<FontAwesomeIcon icon={faQuestionCircle} size="0.7x" color="#007BFF" /></h1>

          </div>
          <ul className="reasons-grid">
            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Verified Academic Resources</h3>
                <p>All Past Questions, Projects, and notes are accurate and reliable.</p>
              </div>
            </li>

            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Easy Access & Download</h3>
                <p>Find materials in seconds with a clean, simple interface.</p>
              </div>
            </li>

            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Open Source Academic Materials</h3>
                <p>Free, community-driven, and regularly updated for accuracy.</p>
              </div>
            </li>

            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Free & Student-friendly</h3>
                <p>All materials are 100% free to access, no hidden fees.</p>
              </div>
            </li>

            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Regularly Updated Content</h3>
                <p>We constantly add the latest questions, notes, and projects to keep you ahead.</p>
              </div>
            </li>

            <li className="reasons">
              <FontAwesomeIcon icon={faCheckCircle} className="reason-icon" />
              <div>
                <h3>Community Driven</h3>
                <p>Students and educators contribute, making this platform stronger together.</p>
              </div>
            </li>


          </ul>
        </div>
      </div>
    </section>
  );
}

export default TrendingResources;