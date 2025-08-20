const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const User = require('./models/User'); // kept for legacy read-only if present
const Student = require('./models/Student');
const Recruiter = require('./models/Recruiter');
const Application = require('./models/Application');
const ContactMessage = require('./models/ContactMessage');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_me_in_env';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placementhub';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Do not set a global Content-Type header; let each route respond appropriately

// Health route
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected: ${MONGO_URI}`))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, fullName, userType, college, course, graduationYear, companyName, designation } = req.body;
    if (!email || !password || !fullName || !userType) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    if (!/^(?!\d)[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
      return res.status(400).json({ message: 'Invalid email: must not start with a digit and must contain @' });
    }
    const existingStudent = userType === 'student' ? await Student.findOne({ email }) : null;
    const existingRecruiter = userType === 'recruiter' ? await Recruiter.findOne({ email }) : null;
    const existingUser = existingStudent || existingRecruiter;
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (userType === 'student') {
      await Student.create({
        email,
        password: hashedPassword,
        fullName,
        userType: 'student',
        college,
        course,
        graduationYear,
      });
    } else if (userType === 'recruiter') {
      if (!companyName) return res.status(400).json({ message: 'Company name is required for recruiters' });
      await Recruiter.create({
        email,
        password: hashedPassword,
        fullName,
        userType: 'recruiter',
        companyName,
        designation,
      });
    }

    const sanitized = { email, fullName, userType };
    res.status(201).json({ message: 'User registered successfully.', user: sanitized });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (!/^(?!\d)[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
      return res.status(400).json({ message: 'Invalid email: must not start with a digit and must contain @' });
    }
    let userDoc = null;
    if (userType === 'student') {
      userDoc = await Student.findOne({ email });
    } else if (userType === 'recruiter') {
      userDoc = await Recruiter.findOne({ email });
    }
    if (!userDoc) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ email: userDoc.email, userType }, JWT_SECRET, { expiresIn: '1h' });
    const sanitized = { email: userDoc.email, fullName: userDoc.fullName, userType };
    res.json({ token, user: sanitized });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Profile routes (basic auth by email+userType from client)
app.get('/api/profile', async (req, res) => {
  try {
    const { email, userType } = req.query;
    if (!email || !userType) return res.status(400).json({ message: 'Missing email or userType' });
    let user = null;
    if (userType === 'student') {
      user = await Student.findOne({ email }).lean();
    } else if (userType === 'recruiter') {
      user = await Recruiter.findOne({ email }).lean();
    }
    if (!user) return res.status(404).json({ message: 'User not found' });
    delete user.password;
    res.json({ user });
  } catch (e) {
    console.error('Get profile error:', e);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const { email, userType } = req.body;
    if (!email || !userType) return res.status(400).json({ message: 'Missing email or userType' });

    const updatable = {
      // basic
      fullName: req.body.fullName,
      username: req.body.username,
      // personal
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phone,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      // academic
      college: req.body.college,
      course: req.body.course,
      department: req.body.department,
      enrollmentNumber: req.body.enrollmentNumber,
      semester: req.body.semester,
      graduationYear: req.body.graduationYear,
      cgpa: req.body.cgpa,
      tenthMarks: req.body.tenthMarks,
      twelfthMarks: req.body.twelfthMarks,
      backlogsCount: req.body.backlogsCount,
      // recruiter
      companyName: req.body.companyName,
      designation: req.body.designation,
      // skills & certs
      technicalSkills: req.body.technicalSkills,
      softSkills: req.body.softSkills,
      certifications: req.body.certifications,
      // internship / projects
      internshipTitle: req.body.internshipTitle,
      internshipCompany: req.body.internshipCompany,
      internshipDuration: req.body.internshipDuration,
      internshipDescription: req.body.internshipDescription,
      projectDetails: req.body.projectDetails,
      // placement prefs
      preferredRole: req.body.preferredRole,
      preferredLocation: req.body.preferredLocation,
      expectedSalary: req.body.expectedSalary,
      relocation: req.body.relocation,
      // media
      avatarData: req.body.avatarData,
      avatarMime: req.body.avatarMime,
      resumeData: req.body.resumeData,
      resumeName: req.body.resumeName,
    };

    Object.keys(updatable).forEach((k) => updatable[k] === undefined && delete updatable[k]);

    let updated = null;
    if (userType === 'student') {
      updated = await Student.findOneAndUpdate({ email }, { $set: updatable }, { new: true, runValidators: true }).lean();
    } else if (userType === 'recruiter') {
      updated = await Recruiter.findOneAndUpdate({ email }, { $set: updatable }, { new: true, runValidators: true }).lean();
    }
    if (!updated) return res.status(404).json({ message: 'User not found' });
    delete updated.password;
    res.json({ user: updated, message: 'Profile updated' });
  } catch (e) {
    console.error('Update profile error:', e);
    if (e.code === 11000 && e.keyPattern && e.keyPattern.username) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Application endpoints
app.post('/api/applications', async (req, res) => {
  try {
    const { 
      applicantEmail, 
      applicantName, 
      applicantContact, 
      applicationType, 
      targetId, 
      targetTitle, 
      targetCompany, 
      resumeData, 
      resumeName 
    } = req.body;

    // Validate required fields
    if (!applicantEmail || !applicantName || !applicantContact || !applicationType || 
        !targetId || !targetTitle || !targetCompany || !resumeData || !resumeName) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Check if user already applied for this position
    const existingApplication = await Application.findOne({
      applicantEmail,
      targetId,
      applicationType
    });

    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this position.' });
    }

    // Create new application
    const application = new Application({
      applicantEmail,
      applicantName,
      applicantContact,
      applicationType,
      targetId,
      targetTitle,
      targetCompany,
      resumeData,
      resumeName
    });

    await application.save();

    res.status(201).json({ 
      message: 'Application submitted successfully!',
      application: {
        id: application._id,
        status: application.status,
        appliedAt: application.appliedAt
      }
    });

  } catch (err) {
    console.error('Application submission error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Contact message endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, userType } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const doc = await ContactMessage.create({ name, email, subject, message, userType: userType || 'student' });
    res.status(201).json({ message: 'Message received. We will get back to you soon.', id: doc._id });
  } catch (err) {
    console.error('Contact message error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get applications for a user
app.get('/api/applications', async (req, res) => {
  try {
    const { email, applicationType } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const filter = { applicantEmail: email };
    if (applicationType) {
      filter.applicationType = applicationType;
    }

    const applications = await Application.find(filter)
      .sort({ appliedAt: -1 })
      .select('-resumeData') // Don't send resume data in list
      .lean();

    res.json({ applications });

  } catch (err) {
    console.error('Get applications error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get applications for recruiters (by target company)
app.get('/api/applications/company', async (req, res) => {
  try {
    const { company, applicationType } = req.query;
    
    if (!company) {
      return res.status(400).json({ message: 'Company is required.' });
    }

    const filter = { targetCompany: { $regex: company, $options: 'i' } };
    if (applicationType) {
      filter.applicationType = applicationType;
    }

    const applications = await Application.find(filter)
      .sort({ appliedAt: -1 })
      .select('-resumeData') // Don't send resume data in list
      .lean();

    res.json({ applications });

  } catch (err) {
    console.error('Get company applications error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update application status (for recruiters)
app.put('/api/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status || !['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const updateData = { status };
    if (status !== 'pending') {
      updateData.reviewedAt = new Date();
    }
    if (notes) {
      updateData.notes = notes;
    }

    const application = await Application.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    ).select('-resumeData');

    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.json({ 
      message: 'Application status updated successfully.',
      application 
    });

  } catch (err) {
    console.error('Update application status error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Serve static files from the React app (adjust path as needed)
app.use(express.static(path.join(__dirname, '../placement/dist')));

// Catch-all route to serve React's index.html for non-API routes
app.get(/^((?!\/api\/).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../placement/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 