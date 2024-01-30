// Login.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

let BASE_URL = 'http://localhost:3001';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make an HTTP POST request to your backend endpoint for user registration
      const response = await axios.post(`${BASE_URL}/login`, {
        username: username,
        password: password,
      });

      // Assuming your backend returns a success status
      if (response.status === 200) {
        // Redirect to the login page after successful registration

        localStorage.setItem("token", response.data.token);
        alert('login successful');
        navigate('/chat');
      } else {
        // Handle other response statuses or errors
        console.error('Login failed:', response.data);
        alert('login failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login failed:', error.message);
      alert('login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
export { BASE_URL }; 
