import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import './index.css'
import NewsletterPage from './components/NewsletterPage';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <nav>
      <Link to="/">Home</Link> | <Link to="/newsletter">Newsletter</Link>
    </nav>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/newsletter" element={<NewsletterPage />} />
    </Routes>
  </BrowserRouter>
);