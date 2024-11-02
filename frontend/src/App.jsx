import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsletterPage from './components/NewsletterPage.jsx' // Import the NewsletterPage component

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <header className="header">
        <h1>Edutunity</h1>
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/newsletter">
            <button>Newsletter</button>
          </Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <h2>Another chance at education</h2>
                <div>
                  <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                  </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                  <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                </div>
                <p className="read-the-docs">
                  Click on the Vite and React logos to learn more
                </p>
              </div>
            }
          />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
