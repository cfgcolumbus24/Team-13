import React, { useState } from 'react';
import { db } from '../../firebase'; // Ensure this points to your Firebase configuration
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore methods

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [role, setRole] = useState('teacher'); // Default role
    const [error, setError] = useState(null);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);
  
      try {
        // Use the modular syntax for querying Firestore
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username), where('pin', '==', pin), where('role', '==', role)); // Include role in query
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // User found - store in localStorage
          localStorage.setItem('user', JSON.stringify({ username, role })); // Save role
          onLogin(username); // Update user state in parent component
        } else {
          setError('Invalid username, pin, or role');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error('Login error:', error); // Logs any specific errors for debugging
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full max-w-md">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="teacher">Teacher</option>
              <option value="proprietor">Proprietor</option>
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Login
          </button>
        </form>
        <Link to="/auth" className="mt-4 text-indigo-600 hover:underline">
          Don't have an account? Register here
        </Link>
      </div>
    );
  }
  
  export default LoginPage;