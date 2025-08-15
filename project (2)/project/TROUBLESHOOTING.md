# Troubleshooting Guide - Notification System

## Common Issues and Solutions

### 1. "Cannot create notification" Error

**Problem**: Recruiters cannot send notifications and get logged out automatically.

**Causes**:
- JWT token not stored properly
- Token expired
- Backend server not running
- MongoDB connection issues

**Solutions**:

#### Step 1: Check Backend Server
```bash
cd project/backend
npm install
npm start
```

Make sure you see:
```
MongoDB connected successfully to localhost:27017/placementhub
Server running on port 5000
```

#### Step 2: Check MongoDB
Make sure MongoDB is running:
```bash
# On Windows
net start MongoDB

# On Mac/Linux
sudo systemctl start mongod
```

#### Step 3: Clear Browser Data
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage
4. Reload the page

#### Step 4: Test Login Flow
1. Go to `/login`
2. Create a new recruiter account or login with existing one
3. Check browser console for any errors
4. Verify token is stored in localStorage

### 2. Automatic Logout Issues

**Problem**: User gets logged out immediately after login or when trying to send notifications.

**Solutions**:

#### Check Token Storage
In browser console, run:
```javascript
console.log('User:', localStorage.getItem('user'));
console.log('Token:', localStorage.getItem('token'));
```

Both should return valid JSON data.

#### Check Token Format
The token should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### Verify Backend Response
Check if login returns both user and token:
```javascript
// Expected response from /api/login
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "recruiter@company.com",
    "fullName": "John Doe",
    "userType": "recruiter",
    "id": "507f1f77bcf86cd799439011"
  }
}
```

### 3. API Connection Issues

**Problem**: Frontend cannot connect to backend API.

**Solutions**:

#### Check CORS
Make sure backend has CORS enabled (already configured in index.js)

#### Check Port
Verify backend is running on port 5000:
```bash
curl http://localhost:5000/api/login
```

#### Check Network Tab
1. Open browser developer tools
2. Go to Network tab
3. Try to send a notification
4. Check if the request to `/api/notifications` is being made
5. Look for any error responses

### 4. Database Issues

**Problem**: Notifications not being saved or retrieved.

**Solutions**:

#### Check MongoDB Connection
In backend console, you should see:
```
MongoDB connected successfully to localhost:27017/placementhub
```

#### Check Database Collections
Connect to MongoDB and verify collections exist:
```bash
mongo
use placementhub
show collections
```

Should show: `users` and `notifications`

#### Check Notification Model
Verify the Notification model is properly imported in index.js

### 5. Frontend Issues

**Problem**: UI not updating or showing errors.

**Solutions**:

#### Check Console Errors
Open browser console (F12) and look for:
- JavaScript errors
- Network request failures
- Authentication errors

#### Check React Components
Verify all components are properly imported in App.tsx:
- SendNotificationPage
- MyNotificationsPage
- NotificationsPage

#### Check Routes
Verify routes are properly configured in App.tsx:
```javascript
<Route path="/send-notification" element={<SendNotificationPage />} />
<Route path="/my-notifications" element={<MyNotificationsPage />} />
```

## Step-by-Step Debugging

### 1. Test Backend API
```bash
cd project
node test-backend.js
```

### 2. Test Login Flow
1. Clear browser localStorage
2. Go to `/login`
3. Create a recruiter account
4. Check if token is stored
5. Try to access `/send-notification`

### 3. Test Notification Creation
1. Login as recruiter
2. Go to `/send-notification`
3. Fill out the form
4. Submit and check browser console
5. Check backend console for errors

### 4. Test Notification Retrieval
1. Login as student
2. Go to `/notifications`
3. Check if notifications are loaded
4. Check browser console for errors

## Common Error Messages

### "Access token required"
- Token not stored in localStorage
- Token expired
- Solution: Re-login

### "Only recruiters can create notifications"
- User type is not 'recruiter'
- Solution: Login with recruiter account

### "Invalid token"
- Token corrupted or expired
- Solution: Clear localStorage and re-login

### "Network error"
- Backend server not running
- Solution: Start backend server

## Prevention Tips

1. **Always check backend is running** before testing
2. **Clear localStorage** when switching between accounts
3. **Check browser console** for detailed error messages
4. **Verify MongoDB** is running and accessible
5. **Use valid email formats** for testing

## Getting Help

If issues persist:
1. Check browser console for specific error messages
2. Check backend console for server errors
3. Verify all dependencies are installed
4. Ensure MongoDB is running
5. Test with a fresh browser session

