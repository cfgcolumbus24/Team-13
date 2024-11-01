import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePostPage from './pages/CreatePostPage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
    </Router>
);

export default App;
