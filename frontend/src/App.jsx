import React, { useEffect, useState } from 'react';
import headerImage from './Edutinity_logo.png';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import NewsletterPage from './components/NewsletterPage.jsx';
import LessonPlanGenerator from "./LessonPlanGenerator";

export default function App() {
  return (
    <>
      {location.pathname === '/' && <Header />}
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 max-w-7xl mx-auto">
                {/* First Row: Two Sneak Peek Boxes */}
                <div className="sneak-peek bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg shadow-lg h-full">
                  <Link to="/newsletter" className="block hover:shadow-xl transition h-full">
                    {recentPost ? (
                      <>
                        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Latest Update</h2>
                        <h3 className="text-3xl font-bold text-gray-700 mb-4">{recentPost.heading}</h3>
                        <p className="text-lg text-gray-500 mb-6">{recentPost.timestamp}</p>
                        <p className="text-xl text-gray-800 whitespace-pre-wrap">
                          {recentPost.content.slice(0, 200)}...
                        </p>
                        <p className="text-indigo-600 mt-6 text-2xl font-semibold">Read more →</p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to Edutunity</h2>
                        <p className="text-lg text-gray-500 mb-6">
                          Stay updated with the latest posts. Check back soon or visit the Newsletter page to see new updates!
                        </p>
                        <p className="text-indigo-600 mt-6 text-2xl font-semibold">Explore more →</p>
                      </>
                    )}
                  </Link>
                </div>
                
                <div className="sneak-peek bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg shadow-lg h-full">
                  <h2 className="text-4xl font-semibold text-gray-800 mb-6">Forum</h2>
                </div>

                {/* Second Row: Full-Width Sneak Peek Box */}
                <div className="md:col-span-2 sneak-peek bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg shadow-lg h-full">
                  <h2 className="text-4xl font-semibold text-gray-800 mb-6">Additional Sneak Peek</h2>
                  <p className="text-lg text-gray-500 mb-6">
                      Here is some additional content. Check back soon for more exciting updates!
                  </p>
                 <p className="text-indigo-600 mt-6 text-2xl font-semibold">Discover more →</p>
                </div>
              </div>
            }
          />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </main>
    </>
  );
}
// Navigation bar
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
  }, [location.pathname]);



function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

//export default App;