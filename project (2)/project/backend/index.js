const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret'; // Change this in production

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set default content-type header
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/placementhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully to localhost:27017/placementhub'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password, fullName, userType, college, course, graduationYear, companyName, designation } = req.body;
  if (!email || !password || !fullName || !userType) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  const existingUser = await User.findOne({ email, userType });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    fullName,
    userType,
    college: userType === 'student' ? college : undefined,
    course: userType === 'student' ? course : undefined,
    graduationYear: userType === 'student' ? graduationYear : undefined,
    companyName: userType === 'recruiter' ? companyName : undefined,
    designation: userType === 'recruiter' ? designation : undefined
  });
  await user.save();
  res.status(201).json({ message: 'User registered successfully.' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, userType } = req.body;
  const user = await User.findOne({ email, userType });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign({ email: user.email, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { email: user.email, fullName: user.fullName, userType: user.userType } });
});

// Serve static files from the React app (adjust path as needed)
const path = require('path');
app.use(express.static(path.join(__dirname, '../placement/dist')));

// Catch-all route to serve React's index.html for non-API routes
app.get(/^((?!\/api\/).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../placement/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 