import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import InternshipsPage from './components/InternshipsPage';
import JobsPage from './components/JobsPage';
import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';
import DashboardPage from './components/DashboardPage';
import UploadResumePage from './components/UploadResumePage';
import CreateJobAlertPage from './components/CreateJobAlertPage';
import NotificationsPage from './components/NotificationsPage';
import SendNotificationPage from './components/SendNotificationPage';
import MyNotificationsPage from './components/MyNotificationsPage';
import ApplyJobPage from './components/ApplyJobPage';
import UserDebug from './components/UserDebug';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upload-resume" element={<UploadResumePage />} />
          <Route path="/create-job-alert" element={<CreateJobAlertPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/send-notification" element={<SendNotificationPage />} />
          <Route path="/my-notifications" element={<MyNotificationsPage />} />
          <Route path="/apply/:jobId" element={<ApplyJobPage />} />
        </Routes>
        <UserDebug />
      </Router>
    </div>
  );
}

export default App;