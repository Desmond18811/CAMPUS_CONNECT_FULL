import "../App.css"
import Card from './Card';
import CategoryCards from './CategoryCards';
import Footer from './Footer';
import Hero from "./Hero";
import How from './How';

import Navbar from "./Navbar";
import Notify from './Notify';
import TrendingResources from './TrendingResources';


const LandingPage = () => {
    return (
        <div className="app-container">
            <Navbar />
            <Hero />
            <CategoryCards />
            <TrendingResources />
            <How />
            <Notify />
            <Footer />
        </div>
    );
}
export default LandingPage