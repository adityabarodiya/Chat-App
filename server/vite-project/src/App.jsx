// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./component/Registration";
import Chat from "./component/Chat";
import Login from "./component/Login";
import Home from "./component/Home";
import AppBar from "./component/AppBar";
import './App.css'

function App() {
  return (
    <Router>
      <AppBar></AppBar>
      <div>

        <Routes>
          <Route path="/registor" element={<Registration />} />
          <Route path="/login" element={<Login />} /> {/*this is line 15}*/}
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/"  element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
