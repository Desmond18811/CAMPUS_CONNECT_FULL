// TrendingResources component displays a list of trending resource cards
import React from "react";
import "../App.css";


// Use the same image for all resource cards (can be replaced with a real image path)
import projectImg from '../assets/react.svg';

const resources = [
  {
    title: "Past Question – Intro to AI",
    course: "CS101",
    year: "2021",
    rating: 4,
    img: projectImg,
  },
  {
    title: "Past Question – Intro to AI",
    course: "CS101",
    year: "2021",
    rating: 4,
    img: projectImg,
  },
];

const TrendingResources = () => (
  <div className="trending-section">
    <h2 className="trending-title">Trending Resources</h2>
    <div className="trending-list">
      {resources.map((res, idx) => (
        <div className="resource-card" key={idx}>
          <div className="resource-thumb">
            <img src={res.img} alt="Resource" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} />
          </div>
          <div className="resource-info">
            <div className="resource-title">{res.title}</div>
            <div className="resource-meta">{res.course} • {res.year}</div>
            <div className="resource-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < res.rating ? "star filled" : "star"}>★</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrendingResources;
