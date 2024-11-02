import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../authService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthComponent = () => {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [role, setRole] = useState('teacher'); // Default to 'teacher'
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await registerUser(username, pin, role);
            alert('User registered successfully!');
            navigate('/login'); // Redirect to the login page
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            {/* Fixed Header */}
            <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-md fixed top-0 left-0 w-full z-50">
                <h1 className="text-5xl font-extrabold text-center text-white">Register</h1>
                <p className="text-lg text-center text-white opacity-75 mt-2">Create your account</p>
            </header>

            {/* Main Content Area */}
            <main className="pt-24 pb-16 px-4 md:px-10 w-full max-w-md flex flex-col items-center mt-16">
                <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md space-y-4 w-full">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="PIN"
                        required
                        className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700">Select Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full p-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="teacher">Teacher</option>
                            <option value="proprietor">Proprietor</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                        Register
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
                <Link to="/login" className="mt-4 text-indigo-600 hover:underline">
                    Already have an account? Login here
                </Link>
            </main>
        </div>
    );
};

export default AuthComponent;