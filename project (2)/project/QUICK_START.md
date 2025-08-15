# Quick Start Guide - Notification System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB installed and running
- Git (optional)

### Step 1: Start Backend Server
```bash
cd project/backend
npm install
npm start
```

You should see:
```
MongoDB connected successfully to localhost:27017/placementhub
Server running on port 5000
```

### Step 2: Start Frontend
```bash
cd project/placement
npm install
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

### Step 3: Test the System

#### As a Recruiter:
1. Go to `http://localhost:5173/login`
2. Click "Sign Up" and select "Recruiter"
3. Create an account with:
   - Email: `recruiter@company.com`
   - Password: `password123`
   - Company: `Test Company`
   - Designation: `HR Manager`
4. After login, click "Send Notification" in the navigation
5. Create a test notification:
   - Type: General Announcement
   - Title: `Test Notification`
   - Message: `This is a test notification from the recruiter`
   - Mark as urgent: Yes
6. Click "Send Notification"

#### As a Student:
1. Go to `http://localhost:5173/login`
2. Click "Sign Up" and select "Student"
3. Create an account with:
   - Email: `student@college.edu`
   - Password: `password123`
   - College: `Test University`
   - Course: `Computer Science Engineering`
   - Graduation Year: `2025`
4. After login, click "Notifications" in the navigation
5. You should see the notification sent by the recruiter

### Step 4: Verify Everything Works

#### Check Recruiter Features:
- ✅ Can send notifications
- ✅ Can view sent notifications
- ✅ Can mark notifications as urgent
- ✅ Can link notifications to jobs

#### Check Student Features:
- ✅ Can view recruiter notifications
- ✅ Can view job opportunities
- ✅ Can apply to jobs
- ✅ Notifications are marked as read when clicked

## 🔧 Troubleshooting

### If Backend Won't Start:
1. Check if MongoDB is running
2. Check if port 5000 is available
3. Run `npm install` in backend directory

### If Frontend Won't Start:
1. Check if Node.js is installed
2. Run `npm install` in placement directory
3. Check if port 5173 is available

### If Login Fails:
1. Clear browser localStorage
2. Check browser console for errors
3. Verify backend is running on port 5000

### If Notifications Don't Work:
1. Check browser console for API errors
2. Verify JWT token is stored in localStorage
3. Check backend console for server errors

## 📱 Features to Test

### Recruiter Dashboard:
- [ ] Send General Announcement
- [ ] Send Job Profile Update
- [ ] Send Hiring Schedule
- [ ] Mark notification as urgent
- [ ] View sent notifications
- [ ] Check read count

### Student Dashboard:
- [ ] View recruiter notifications
- [ ] View job opportunities
- [ ] Apply to jobs
- [ ] Mark notifications as read
- [ ] See urgent notifications highlighted

## 🎯 Next Steps

Once everything is working:
1. Create more realistic test data
2. Test with multiple users
3. Customize the UI/UX
4. Add more notification types
5. Implement email notifications

## 📞 Support

If you encounter issues:
1. Check the `TROUBLESHOOTING.md` file
2. Look at browser console errors
3. Check backend server logs
4. Verify MongoDB connection

Happy testing! 🎉

