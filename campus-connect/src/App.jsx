import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from "./Components/HomePage.jsx";
import Liked from "./Components/Liked.jsx";
import Search from "./Components/Search.jsx";
import Saved from "./Components/Saved.jsx";
import Notifications from "./Components/Notifications.jsx";
import Create from "./Components/Create.jsx";
import Explore from "./Components/Explore.jsx";
import Settings from "./Components/Settings.jsx"
import ForgotPassWord from "./Components/ForgotPassword.jsx";
import Comments from "./Components/Comments.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassWord/>}/>
                <Route path="/home" element={<HomePage />} />
                <Route path="/liked" element={<Liked/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/notifications" element={<Notifications/>}/>
                <Route path="/create" element={<Create/>} />
                <Route path="/explore" element={<Explore/>} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="" element={<Comments/>} />
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;