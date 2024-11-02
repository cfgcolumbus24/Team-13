import React, { useState } from 'react';
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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Pin"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="teacher">Teacher</option>
                    <option value="proprietor">Proprietor</option>
                </select>
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AuthComponent;