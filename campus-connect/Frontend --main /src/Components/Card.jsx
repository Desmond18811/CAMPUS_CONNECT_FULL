// Card.jsx
import React from "react";
import "../styles/Card.css";

const Card = ({ title, description, image, buttonText, buttonIcon }) => {
  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="card-content">
        {title && <h2 className="card-title">{title}</h2>}
        {description && <p className="card-description">{description}</p>}
        {buttonText && (
          <button className="card-btn">
            {buttonText} {buttonIcon && buttonIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;