# PlacementHub - Notification System

## Overview
This project includes a comprehensive notification system that allows recruiters to send updates about job profiles and hiring schedules to students.

## Features

### For Recruiters:
1. **Send Notifications**: Create and send notifications to all students
2. **Notification Types**:
   - General Announcements
   - Job Profile Updates
   - Hiring Schedule Updates
3. **View Sent Notifications**: Track all notifications you've sent
4. **Urgent Notifications**: Mark important notifications as urgent
5. **Job-Specific Updates**: Link notifications to specific job postings

### For Students:
1. **View Notifications**: See all notifications from recruiters
2. **Notification Categories**: Separate sections for recruiter updates and job opportunities
3. **Read Tracking**: Notifications are marked as read when clicked
4. **Urgent Alerts**: Special highlighting for urgent notifications

## Setup Instructions

### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd project/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running locally on port 27017

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the placement directory:
   ```bash
   cd project/placement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use

### As a Recruiter:

1. **Login** with your recruiter account
2. **Send Notifications**:
   - Click "Send Notification" in the navigation
   - Choose notification type (General, Job Update, or Hiring Schedule)
   - Fill in the title and message
   - Add optional details like hiring date, location, or job reference
   - Mark as urgent if needed
   - Click "Send Notification"

3. **View Sent Notifications**:
   - Click "My Notifications" in the navigation
   - See all notifications you've sent
   - Track how many students have read each notification

### As a Student:

1. **Login** with your student account
2. **View Notifications**:
   - Click "Notifications" in the navigation
   - See two sections:
     - "Recruiter Updates": Notifications from recruiters
     - "Job Opportunities": Available job postings
3. **Interact with Notifications**:
   - Click on notifications to mark them as read
   - Apply to job opportunities directly from the notifications page

## API Endpoints

### Notifications:
- `POST /api/notifications` - Create a new notification (recruiters only)
- `GET /api/notifications` - Get all notifications (students only)
- `GET /api/notifications/my` - Get recruiter's sent notifications (recruiters only)
- `POST /api/notifications/:id/read` - Mark notification as read (students only)

## Database Schema

### Notification Model:
```javascript
{
  title: String,
  message: String,
  type: String, // 'general', 'job_update', 'hiring_schedule'
  recruiterId: ObjectId,
  recruiterName: String,
  companyName: String,
  jobId: String, // optional
  jobTitle: String, // optional
  hiringDate: Date, // optional
  location: String, // optional
  isUrgent: Boolean,
  createdAt: Date,
  readBy: [ObjectId] // array of student IDs who read the notification
}
```

## Security Features

- JWT authentication for all API endpoints
- Role-based access control (recruiters vs students)
- Input validation and sanitization
- Secure token-based authentication

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, TypeScript, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## File Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Notification.js
│   └── index.js
└── placement/
    └── src/
        └── components/
            ├── NotificationsPage.tsx
            ├── SendNotificationPage.tsx
            └── MyNotificationsPage.tsx
```


