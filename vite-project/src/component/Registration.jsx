    // Registration.js
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        // Implement logic to send registration data to the backend
        // Use WebSocket or HTTP request to register the user
        // Redirect to login page after successful registration
        navigate('/login');
    };

    return (
        <div>
        <h2>Registor</h2>
        <form>
            <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                <br /><br />
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br /><br />
            <button type="button" onClick={handleRegister}>
            Register
            </button>
        </form>
        </div>
    );
    }

    export default Registration;
