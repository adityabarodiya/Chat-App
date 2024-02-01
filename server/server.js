const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  "mongodb+srv://adityabarodiya:xJgDIkvrklyd04Mt@cluster0.m6xjsds.mongodb.net/Chatting";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema for Users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  messages: [
    {
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

const SECRET = "secret_KEY";

// Authentication middleware
const authenticate = (req, res, next) => {
  // Retrieve the token from the request header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid token", token: token });
    }

    // Attach the user information to the request object for later use
    req.user = decoded;
    next();
  });
};

// User Registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id, username: newUser.username },
      SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      SECRET,
      {
        expiresIn: "12h",
      }
    );

    // Retrieve user's messages
    const messages = user.messages || [];

    // Send login response with messages
    res.status(200).json({ message: "Login successful", token, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Protected chat endpoint using the authenticate middleware
app.get("/chat", authenticate, (req, res) => {
  // Access the authenticated user information
  const { username } = req.user;

  res.json({
    message: `Welcome to the chat, ${username}!`,
    username: username,
  });
});

// Define the "me" endpoint
app.get("/me", authenticate, async (req, res) => {
  try {
    // Retrieve user information from the authenticated request
    const user = req.user;

    // Construct the response object with desired user information
    const responseData = {
      username: user.username,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search for users based on the query
app.get("/searchUsers", authenticate, async (req, res) => {
  try {
    const { query } = req.query;

    // Use a case-insensitive regex for the search
    const regex = new RegExp(query, "i");

    // Find users matching the query
    const users = await User.find({ username: regex });

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Socket.io Implementation
io.on("connection", (socket) => {
  console.log("User connected");

  // Handle incoming messages
  socket.on("message", async (data) => {
    console.log("Message received:", data);

    // Save the message to the user's messages array in the database
    const user = await User.findById(data.userId);
    if (user) {
      user.messages.push({ content: data.message });
      await user.save();
    }

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
