const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['job_update', 'hiring_schedule', 'general'] 
  },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiterName: { type: String, required: true },
  companyName: { type: String, required: true },
  jobId: { type: String }, // Optional, for job-specific updates
  jobTitle: { type: String }, // Optional, for job-specific updates
  hiringDate: { type: Date }, // For hiring schedule notifications
  location: { type: String }, // For hiring schedule notifications
  isUrgent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Track who has read the notification
});

module.exports = mongoose.model('Notification', notificationSchema);


