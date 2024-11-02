import React, { useEffect, useState } from 'react';
import headerImage from './Edutinity_logo.png';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import NewsletterPage from './components/NewsletterPage.jsx';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={headerImage} alt="Header Left Image" className="header-image" />
      </div>
      <div className="logo-title">
        <h1>Edutunity</h1>
      </div>
    </header>
  );
}

function AppContent() {
  const location = useLocation();
  const [recentPost, setRecentPost] = useState(null);

  // Load the latest post from localStorage
  useEffect(() => {
    const latestPost = JSON.parse(localStorage.getItem('latestPost'));
    setRecentPost(latestPost);
  }, [location.pathname]); // Re-fetch the latest post if the route changes

  return (
    <>
      {location.pathname === '/' && <Header />}
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 max-w-7xl mx-auto">
                {/* Left Column: Sneak Peek Section */}
                {recentPost && (
                  <div className="sneak-peek bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg shadow-lg h-full">
                    <Link to="/newsletter" className="block hover:shadow-xl transition h-full">
                      <h2 className="text-4xl font-semibold text-gray-800 mb-6">Latest Update</h2>
                      <h3 className="text-3xl font-bold text-gray-700 mb-4">{recentPost.heading}</h3>
                      <p className="text-lg text-gray-500 mb-6">{recentPost.timestamp}</p>
                      <p className="text-xl text-gray-800 whitespace-pre-wrap">
                        {recentPost.content.slice(0, 200)}...
                      </p>
                      <p className="text-indigo-600 mt-6 text-2xl font-semibold">Read more →</p>
                    </Link>
                  </div>
                )}
                <div className="hidden md:block"></div>
              </div>
            }
          />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </main>

      <div className="flex justify-center mt-4">
      <Link to="/forum" className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Forum
            </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;