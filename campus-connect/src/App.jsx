
import './App.css';
import Card from './Components/Card';
import CategoryCards from './Components/CategoryCards';
import Footer from './Components/Footer';
import Hero from "./Components/Hero";
import How from './Components/How';

import Navbar from "./Components/Navbar";
import Notify from './Components/Notify';
import TrendingResources from './Components/TrendingResources';
// Main App component
// Renders the Navbar and Hero section inside a styled container

function App() {
  return (
    <div className="app-container">
    <Navbar/>
    <Hero/>
    <CategoryCards/>
    <TrendingResources/>
    <How/>
    <Notify/>
    <Footer/>
    </div>
  );
}

export default App
