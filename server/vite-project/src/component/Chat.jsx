import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Paper, Box, Typography, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import fetchData from "./helperFunctions";
import { BASE_URL } from "./Login";

const socket = io(BASE_URL); 

function Chat() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    fetchData(setUsername);

    if (!name) {
      const enteredName = prompt("Please enter your name:");
      setName(enteredName || "Anonymous");
    }

    socket.connect();

    socket.on("message", (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    // Retrieve user messages on login
    socket.on("login", (data) => {
      setChatMessages(data.messages || []);
    });

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

    // Add the sent message to the local state for immediate display
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { text: message, user: name, timestamp },
    ]);

    setMessage("");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #ccc",
          padding: 2,
          maxHeight: 200,
          overflowY: "auto",
        }}
        ref={messageContainerRef}
      >
        {chatMessages.map((msg, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Paper
              sx={{
                backgroundColor: "#dcf8c6",
                padding: 2,
                borderRadius: 1,
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </Paper>
            <Typography variant="caption" sx={{ color: "#888" }}>
              {msg.user} - {msg.timestamp}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <TextField
          type="text"
          placeholder="Type a message..."
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ flex: 1, marginRight: 1 }}
        />
        <IconButton
          color="success"
          onClick={handleSendMessage}
          sx={{ borderRadius: "50%" }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Chat;
