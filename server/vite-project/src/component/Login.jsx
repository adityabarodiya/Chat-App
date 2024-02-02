// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

let BASE_URL = window.location.origin;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        alert("login successful");
      } else {
        // Handle other response statuses or errors
        console.error("Login failed:", response.data);
        alert("login failed");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Login failed:", error.message);
      alert("login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <div className="login-form" style={{}}>
          <Card style={{width: 350, padding: 20}} >
            <div style={{ }}>
              <TextField
                id="filled-basic"
                fullWidth={true}
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />

              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth={true}
                onChange={(e) => setPassword(e.target.value)}
              />

              <br />
              <br />

              <Button variant="outlined" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
export { BASE_URL };
