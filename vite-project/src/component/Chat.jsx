import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import fetchData from "./helperFunctions";
import "./Chat.css";

const socket = io("http://localhost:3001"); // Replace with your backend URL

function Chat() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    fetchData(setUsername);

    // Prompt user for name if not set
    if (!name) {
      const enteredName = prompt("Please enter your name:");
      setName(enteredName || "Anonymous");
    }

    // Connect to the WebSocket server
    socket.connect();

    // Listen for incoming messages
    socket.on("message", (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [name]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    socket.emit("message", { text: message, user: name, timestamp });
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div ref={messageContainerRef} className="message-container">
        {chatMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="user-text">{`${msg.text}`}</div>
            <span className="username">{msg.user}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
