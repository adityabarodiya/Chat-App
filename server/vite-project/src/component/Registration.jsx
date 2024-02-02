// Registration.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement logic to send registration data to the backend
    // Use WebSocket or HTTP request to register the user
    // Redirect to login page after successful registration
    navigate("/login");
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
          Sign Up
        </Typography>
        <div className="login-form" >
          <Card style={{width: 350, padding: 20}}>
            <div style={{  }}>
              <TextField
                id="filled-basic"
                label="Username"
                fullWidth={true}

                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />

              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                fullWidth={true}

                variant="outlined"
                width="70vh"
                onChange={(e) => setPassword(e.target.value)}
              />

              <br />
              <br />

              <Button variant="outlined" onClick={handleRegister}>
                Sign up
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Registration;
