import React from "react";
import "./Notify.css";

function Notify() {
  return (
    <section className="notify-section">
      <div className="notify-container">
        <div className="notify-card">
          <h2 className="notify-title">Get notified on new updates</h2>
          <p className="notify-text">
             Stay ahead with the latest resources, materials, and announcements. 
  Subscribe to get updates delivered straight to your inbox.
          </p>

          <form className="notify-form">
       
            <input
              id="email-address"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="notify-input"
            />
            <button type="submit" className="notify-button">
              Notify me
            </button>
          </form>

          {/* Decorative background */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="notify-svg"
          >
            <circle
              r="512"
              cx="512"
              cy="512"
              fill="url(#circle-gradient)"
              fillOpacity="0.7"
            ></circle>
            <defs>
              <radialGradient
                id="circle-gradient"
                r="1"
                cx="0"
                cy="0"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#1e3a8a"></stop>
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Notify;
