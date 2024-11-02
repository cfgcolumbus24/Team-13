import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumPage from './pages/ForumPage';
import PostDetail from './pages/PostDetail';
import AuthComponent from './components/AuthComponent'; // Import the Auth component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/auth" element={<AuthComponent />} /> {/* Auth Route */}
            </Routes>
        </Router>
    );
}

export default App;