const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
<<<<<<< HEAD
const Notification = require('./models/Notification');
=======
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc

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
<<<<<<< HEAD
  res.json({ token, user: { email: user.email, fullName: user.fullName, userType: user.userType, id: user._id } });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Create notification (for recruiters)
app.post('/api/notifications', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can create notifications' });
    }
    
    const {
      title,
      message,
      type,
      jobId,
      jobTitle,
      hiringDate,
      location,
      isUrgent
    } = req.body;
    
    const recruiter = await User.findOne({ email: req.user.email, userType: 'recruiter' });
    
    const notification = new Notification({
      title,
      message,
      type,
      recruiterId: recruiter._id,
      recruiterName: recruiter.fullName,
      companyName: recruiter.companyName,
      jobId,
      jobTitle,
      hiringDate: hiringDate ? new Date(hiringDate) : undefined,
      location,
      isUrgent: isUrgent || false
    });
    
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Error creating notification' });
  }
});

// Get notifications (for students)
app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'student') {
      return res.status(403).json({ message: 'Only students can view notifications' });
    }
    
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Get notifications by recruiter (for recruiters to see their own notifications)
app.get('/api/notifications/my', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can view their notifications' });
    }
    
    const recruiter = await User.findOne({ email: req.user.email, userType: 'recruiter' });
    const notifications = await Notification.find({ recruiterId: recruiter._id })
      .sort({ createdAt: -1 });
    
    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching recruiter notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Mark notification as read
app.post('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const student = await User.findOne({ email: req.user.email, userType: 'student' });
    if (!student) {
      return res.status(403).json({ message: 'Only students can mark notifications as read' });
    }
    
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    if (!notification.readBy.includes(student._id)) {
      notification.readBy.push(student._id);
      await notification.save();
    }
    
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
=======
  res.json({ token, user: { email: user.email, fullName: user.fullName, userType: user.userType } });
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
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