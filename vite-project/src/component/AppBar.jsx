// AppBar.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import fetchData from "./helperFunctions";
import { handleLogOut , navigateToSignUp, navigateToLogin} from "./helperFunctions";

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
      <div style={{ display: "flex", justifyContent:"space-between"}}>
        <h1>Chatting</h1>
        <h1>Welcome {username}</h1>
        <button onClick={()=> handleLogOut(navigate)}>Logout</button>
      </div>
    );
  } else {
    return (
        <div style={{ display: "flex", justifyContent:"space-between"}}>
        <h1>Chatting</h1>
        <h1>Please Login or Signup</h1>
        <button onClick={()=> navigateToLogin(navigate)} >Login</button>
        <button onClick={()=> navigateToSignUp(navigate)}>SignUp</button>
      </div>
    );
  }
};

export default AppBar;
