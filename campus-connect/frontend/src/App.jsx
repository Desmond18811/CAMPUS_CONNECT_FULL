import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import HomePage from './Components/HomePage.jsx';
import Liked from './Components/Liked.jsx';
import Search from './Components/Search.jsx';
import Saved from './Components/Saved.jsx';
import Notifications from './Components/Notifications.jsx';
import Create from './Components/Create.jsx';
import Explore from './Components/Explore.jsx';
import Settings from './Components/Settings.jsx';
import ForgotPassWord from './Components/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import Comments from './Components/Comments.jsx';
import LikedPostsPopup from "./Components/LikedPostsPopUp.jsx";
import AuthSuccess from "./Components/AuthSuccess.jsx";
import Help from "./Components/Help.jsx";
import PrivacySupport from "./Components/PrivacySupport.jsx";
import AccountStatus from "./Components/AccountStatus.jsx";
import { SocketProvider } from './Context/SocketContext.jsx';

function App() {
    return (
        <SocketProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassWord />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/liked" element={<Liked />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/likedPosts" element={<LikedPostsPopup />} />
                    <Route path="/auth-success" element={<AuthSuccess />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/privacy-support" element={<PrivacySupport />} />
                    <Route path="/account-status" element={<AccountStatus />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </Router>
        </SocketProvider>
    );
}

export default App;