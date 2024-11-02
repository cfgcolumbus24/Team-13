// Imports
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Page Components
import NewsletterPage from './components/NewsletterPage';
import LessonPlanGenerator from './LessonPlanGenerator';
import ForumPage from './pages/ForumPage';
import PostDetail from './pages/PostDetail';
import AuthComponent from './components/AuthComponent';
import LoginPage from './components/Login';
import CreatePostPage from './pages/CreatePostPage';

import './App.css';
import headerImage from './Edutinity_logo.png';

function Header() {
  return (
    <header className="header flex justify-center items-center bg-gray-800 text-white py-6">
      <div className="logo-container flex flex-col items-center">
        <img src={headerImage} alt="Edutunity Logo" className="logo h-24" />
        <h1 className="text-3xl font-bold mt-2">Edutunity</h1>
      </div>
    </header>
  );
}

function SneakPeekBox({ title, link, content }) {
  return (
    <div className="sneak-peek">
      <Link to={link} className="block hover:shadow-lg transition duration-300">
        <h2>{title}</h2>
        {content}
      </Link>
    </div>
  );
}

function HomePage({ recentPost }) {
  return (
    <div className="home-page flex flex-col items-center gap-8 py-8">
      {/* Main Sneak Peek Box */}
      <SneakPeekBox
        title={recentPost ? "Latest Update" : "Welcome to Edutunity"}
        link="/newsletter"
        content={
          recentPost ? (
            <>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{recentPost.heading}</h3>
              <p className="text-sm text-gray-500 mb-4">{recentPost.timestamp}</p>
              <p className="text-lg text-gray-800 mb-4">{recentPost.content.slice(0, 100)}...</p>
              <p className="text-indigo-600 font-semibold">Read more →</p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-500 mb-4">
                Stay updated with the latest posts. Check back soon or visit the Newsletter page to see new updates!
              </p>
              <p className="text-indigo-600 font-semibold">Explore more →</p>
            </>
          )
        }
      />

      {/* Secondary Sneak Peek Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <SneakPeekBox
          title="Chat-Bot"
          link="/lesson-plans"
          content={<p className="text-lg text-gray-500">Join discussions and explore various topics in our community forum.</p>}
        />
        <SneakPeekBox
          title="Forum"
          link="/forum"
          content={
            <>
              <p className="text-lg text-gray-500 mb-4">
                Access the forums to ask and answer questions.
              </p>
              <p className="text-indigo-600 font-semibold">Go to the forum →</p>
            </>
          }
        />
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [recentPost, setRecentPost] = useState(null);
  const [user, setUser] = useState(null);

  // Load the latest post from localStorage when location changes
  useEffect(() => {
    const latestPost = JSON.parse(localStorage.getItem('latestPost'));
    setRecentPost(latestPost);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.username); // Set the user from localStorage
    }
  }, [location.pathname]);

  const handleLogin = (username) => {
    setUser(username); // Update user state
    localStorage.setItem('user', JSON.stringify({ username }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    setUser(null); // Update user state
  };

  return (
    <>
      {location.pathname === '/' && <Header />}
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage recentPost={recentPost} />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/lesson-plans" element={<LessonPlanGenerator />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/auth" element={<AuthComponent />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </main>
      {user && (
        <div className="fixed bottom-4 right-4 bg-white shadow-md rounded p-2">
          <p>Welcome, {user}!</p>
          <button onClick={handleLogout} className="text-blue-500 hover:underline">Logout</button>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}