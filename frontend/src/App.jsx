import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { db } from '../firebase'; // Ensure this points to your Firebase configuration
import Home from './components/Home';
import Login from './components/Login'; // Import your Login component
import NewsletterPage from './components/NewsletterPage';
import LessonPlanGenerator from './LessonPlanGenerator';
import ForumPage from './pages/ForumPage';
import PostDetail from './pages/PostDetail';
import AuthComponent from './components/AuthComponent';
import CreatePostPage from './pages/CreatePostPage';
import PostForm from './components/PostForm';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser ? storedUser.username : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Determine if the current path is the login page
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isLoginPage && <Navbar />} {/* Only show Navbar if not on login page */}
      <Routes>
        {/* Always render the login page */}
        <Route path="/" element={<Login setUser={setUser} />} />
        {/* Other routes */}
        <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/lesson-plans" element={<LessonPlanGenerator />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/auth" element={<AuthComponent />} />
        <Route path="/create-post" element={<PostForm />} />
      </Routes>
    </div>
  );
}

// Wrap App component with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
