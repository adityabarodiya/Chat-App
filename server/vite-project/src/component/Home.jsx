// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Welcome to the Chat App</h1>

      <div>
        <button onClick={handleLoginClick}>Login</button>
      </div>

      <div>
        <button onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default Home;
