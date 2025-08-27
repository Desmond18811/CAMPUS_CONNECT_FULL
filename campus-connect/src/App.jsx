
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import CategoryCards from './Components/CategoryCards';
import TrendingResources from './Components/TrendingResources';
import './App.css';

// Main App component
// Renders the Navbar and Hero section inside a styled container

function App() {
  return (
    <div className="app-container">
      {/* Top navigation bar */}
      <Navbar />
      {/* Hero section with headline and CTA */}
      <Hero />
      {/* Category cards section */}
      <CategoryCards />
      {/* Trending resources section */}
      <TrendingResources />
    </div>
  );
}

export default App
