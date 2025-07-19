const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, required: true },
  college: String,
  course: String,
  graduationYear: String,
  companyName: String,
  designation: String
});

module.exports = mongoose.model('User', userSchema); 