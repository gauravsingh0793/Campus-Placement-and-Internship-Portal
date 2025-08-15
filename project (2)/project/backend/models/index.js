const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./db'); // connects to MongoDB
const User = require('./models/User'); // import User model

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/api/your-endpoint", (req, res) => {
  res.send('🎉 Backend API is working!');
});

// POST route to add a user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
