// CategoryCards component displays the three main resource categories
import React from "react";
import "../App.css";

const categories = [
  {
    icon: "?",
    label: "Past Questions",
  },
  {
    icon: "📄",
    label: "Projects",
  },
  {
    icon: "📁",
    label: "Notes & Materials",
  },
];

const CategoryCards = () => (
  <div className="category-cards">
    {categories.map((cat, idx) => (
      <div className="category-card" key={idx}>
        <div className="category-icon">{cat.icon}</div>
        <div className="category-label">{cat.label}</div>
      </div>
    ))}
  </div>
);

export default CategoryCards;
