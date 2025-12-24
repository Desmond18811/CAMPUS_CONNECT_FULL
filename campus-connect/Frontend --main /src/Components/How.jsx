import { FaSearch, FaDownload, FaUsers, FaSmile, FaChartLine, FaHandshake } from "react-icons/fa";
import "../styles/How.css";
import animationData from "../assets/what-to-do.json";
import Lottie from "lottie-react";

function How() {
  return (
    <section className="how-section">
      <div className="how-content">

        <div className="left-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>


        <div className="right">
          <h1 className="how-title">How it works</h1>
          <ul className="how-grid">
            <li className="how-step">
              <FaSearch className="how-icon" />
              <div>
                <h3>Search for Materials/Papers</h3>
                <p>
                  Easily find academic resources, research papers, and study
                  materials using our powerful search feature.
                </p>
              </div>
            </li>

            <li className="how-step">
              <FaDownload className="how-icon" />
              <div>
                <h3>Download/View the Resource</h3>
                <p>
                  Access the materials instantly — view them online or download
                  for offline study at your convenience.
                </p>
              </div>
            </li>

            <li className="how-step">
              <FaUsers className="how-icon" />
              <div>
                <h3>Contribute to Community</h3>
                <p>
                  Share your own notes, upload resources, and collaborate with
                  other learners to grow the knowledge base.
                </p>
              </div>
            </li>

            <li className="how-step">
              <FaSmile className="how-icon" />
              <div>
                <h3>Enjoy</h3>
                <p>
                  Improve your learning journey, connect with peers, and enjoy a
                  smoother, smarter way to study.
                </p>
              </div>
            </li>

            <li className="how-step">
              <FaUsers className="how-icon" />
              <div>
                <h3>Track Your Progress</h3>
                <p>
                  Stay on top of your studies by monitoring what you’ve learned
                  and what’s next.
                </p>
              </div>
            </li>

            <li className="how-step">
              <FaSmile className="how-icon" />
              <div>
                <h3>Stay Motivated</h3>
                <p>
                  With community support and regular updates, your learning
                  experience remains engaging and inspiring.
                </p>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}

export default How;