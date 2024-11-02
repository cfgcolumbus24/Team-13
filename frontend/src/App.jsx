import logo from './Edutinity_logo.png'; // Adjust the path if necessary
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import NewsletterPage from './components/NewsletterPage.jsx'; // Import the NewsletterPage component

function Header() {
  return (
    <header className="header">
      <div className="logo-title">
        <img src={logo} alt="Edutunity Logo" className="logo-img" />
        <h1>Edutunity</h1>
      </div>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/newsletter">
          <button>Newsletter</button>
        </Link>
      </nav>
    </header>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current route location

  return (
    <>
      {/* Conditionally render the header only on the homepage */}
      {location.pathname === '/' && <Header />}
      <main className="content">
        <Routes>
          <Route
            path="/"
          />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </main>
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
