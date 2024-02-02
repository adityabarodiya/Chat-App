import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchData from "./helperFunctions";
import {
  handleLogOut,
  navigateToSignUp,
  navigateToLogin,
  navigateToChat,
} from "./helperFunctions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AppBar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored as 'token'
    fetchData(setUsername);
    // console.log(username);
  }, []);

  if (username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1">
          Welcome {username}
        </Typography>
        <div>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => navigateToChat(navigate)}
          >
            Chat
          </Button>
          <Button variant="contained" onClick={() => handleLogOut(navigate)}>
            Log out
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 40,
        }}
      >
        <Typography variant="h5" component="h2">
          Login or Signup
        </Typography>
        <div>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => navigateToLogin(navigate)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigateToSignUp(navigate)}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
};

export default AppBar;
