import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumPage from './pages/ForumPage';
import PostDetail from './pages/PostDetail';
import AuthComponent from './components/AuthComponent'; // Import the Auth component
import LoginPage from './components/Login';
import { db } from '../firebase'
import CreatePostPage from './pages/CreatePostPage';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser.username); // Set the user from localStorage
        }
    }, []);

    const handleLogin = (username) => {
        setUser(username); // Update user state
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user from localStorage
        setUser(null); // Update user state
    };
    return (
        <Router>
            <Routes>
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
                <Route path="/auth" element={<AuthComponent />} /> {/* Auth Route */}
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/create-post" element={<CreatePostPage />} />
            </Routes>
        </Router>
    );
}

export default App;