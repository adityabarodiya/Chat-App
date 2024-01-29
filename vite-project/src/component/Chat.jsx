// Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your backend URL

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    socket.connect();

    // Listen for incoming messages
    socket.on('message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });
    
    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    // Send the message to the WebSocket server
    socket.emit('message', { text: message, user: 'current_user' });
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>{`${msg.user}: ${msg.text}`}</div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default Chat;
