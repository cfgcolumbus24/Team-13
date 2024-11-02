import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForumPage from './pages/ForumPage';
import CreatePostPage from './pages/CreatePostPage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/forum" element={<ForumPage />} />
        </Routes>
    </Router>
);

export default App;