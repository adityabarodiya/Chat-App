// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./component/Registration";
import Chat from "./component/Chat";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <div>
        Chatting App
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
