// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser ? storedUser.username : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          {/* Always render the login page */}
          <Route path="/" element={<Login setUser={setUser} />} />
          {/* Other routes */}
          <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/lesson-plans" element={<LessonPlanGenerator />} />
          <Route path="/forum" element={<PostForm />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/auth" element={<AuthComponent />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}