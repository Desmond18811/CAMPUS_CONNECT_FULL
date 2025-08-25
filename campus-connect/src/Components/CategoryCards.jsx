// CategoryCards component displays the three main resource categories

import projectImg from '../assets/react.svg';

const categories = [
  {
    icon: <img src={projectImg} alt="Past Questions" style={{width: '38px', height: '38px', borderRadius: '8px'}} />, // image above Past Questions
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

// CategoryCards component displays the three main resource categories
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
