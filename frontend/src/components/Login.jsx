import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this points to your Firebase configuration
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [role, setRole] = useState('teacher'); // Default role
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.username);
      navigate('/home'); // Redirect to home page if logged in
    }
  }, [navigate, setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username), where('pin', '==', pin), where('role', '==', role));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        localStorage.setItem('user', JSON.stringify({ username, role }));
        setUser(username);
        navigate('/home'); // Redirect to home page after successful login
      } else {
        setError('Invalid username, pin, or role');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-5xl font-extrabold text-center text-white">Login</h1>
        <p className="text-lg text-center text-white opacity-75 mt-2">Access your account</p>
      </header>

      <main className="pt-24 pb-16 px-4 md:px-10 w-full max-w-md flex flex-col items-center mt-16">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Select Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="teacher">Teacher</option>
              <option value="proprietor">Proprietor</option>
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;