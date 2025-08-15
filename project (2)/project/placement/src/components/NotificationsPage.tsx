import React, { useEffect, useState } from 'react';

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
<<<<<<< HEAD
    const [backendNotifications, setBackendNotifications] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string>('');
=======
    const [user, setUser] = useState<any>(null);
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
    const [showApply, setShowApply] = useState<number | null>(null);
    const [applyForm, setApplyForm] = useState({
        name: '',
        contact: '',
        email: '',
        resume: null as File | null,
    });
    const [success, setSuccess] = useState(false);
    const [applications, setApplications] = useState<any[]>([]);
<<<<<<< HEAD
    const [loading, setLoading] = useState(false);
=======
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
        setNotifications(jobs);
        const userData = localStorage.getItem('user');
<<<<<<< HEAD
        const tokenData = localStorage.getItem('token');
        if (userData && tokenData) {
            setUser(JSON.parse(userData));
            setToken(tokenData);
            
            const apps = JSON.parse(localStorage.getItem('applications') || '[]');
            setApplications(apps);
            
            // Fetch backend notifications if user is a student
            if (JSON.parse(userData).userType === 'student') {
                fetchBackendNotifications();
            }
        }
    }, [token]);

    const fetchBackendNotifications = async () => {
        if (!token) return;
        
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const notifications = data.notifications || [];
                // Sort notifications: unread first, then by date
                const sortedNotifications = notifications.sort((a: any, b: any) => {
                    const aIsRead = a.readBy && a.readBy.includes(user.id);
                    const bIsRead = b.readBy && b.readBy.includes(user.id);
                    
                    if (aIsRead !== bIsRead) {
                        return aIsRead ? 1 : -1; // Unread first
                    }
                    
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
                });
                setBackendNotifications(sortedNotifications);
            } else if (response.status === 401) {
                // Token expired or invalid, redirect to login
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId: string) => {
        if (!token) return;
        
        try {
            await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Update the local state to mark notification as read
            setBackendNotifications(prevNotifications => 
                prevNotifications.map(notification => 
                    notification._id === notificationId 
                        ? { ...notification, readBy: [...(notification.readBy || []), user.id] }
                        : notification
                )
            );
            
            // Dispatch event to update notification count in navigation
            window.dispatchEvent(new Event('notificationRead'));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // For recruiters: show applications for their jobs and notification options
    if (user && user.userType === 'recruiter') {
        const myJobIds = notifications.filter(j => j.postedBy === user.email).map(j => j.id);
        const myApplications = applications.filter(app => myJobIds.includes(app.jobId));
        
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
                <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
                
                {/* Notification Management Section */}
                <div className="w-full max-w-4xl mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Notification Management</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">📢 Send Notifications</h3>
                            <p className="text-gray-600 mb-4">Create and send notifications to all students about job updates, hiring schedules, or general announcements.</p>
                            <a 
                                href="/send-notification"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                            >
                                Send New Notification
                            </a>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 View Sent Notifications</h3>
                            <p className="text-gray-600 mb-4">Track all notifications you've sent and see how many students have read them.</p>
                            <a 
                                href="/my-notifications"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
                            >
                                View My Notifications
                            </a>
                        </div>
                    </div>
                </div>

                {/* Job Applications Section */}
                <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-800">Job Applications</h2>
                    {myApplications.length === 0 ? (
                        <div className="bg-white p-6 rounded-xl shadow text-center">
                            <div className="text-4xl mb-4">📭</div>
                            <div className="text-gray-700 mb-2">No students have applied to your jobs yet.</div>
                            <div className="text-sm text-gray-500">When students apply to your job postings, they will appear here.</div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myApplications.map((app, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <div className="font-semibold text-lg text-blue-700">{app.name}</div>
                                        <div className="text-gray-700">{app.email}</div>
                                        <div className="text-gray-700">Contact: {app.contact}</div>
                                        <div className="text-gray-700">Applied for: {app.jobTitle}</div>
                                        {app.resumeData && (
                                            <a href={app.resumeData} download={app.resumeName} className="text-blue-600 hover:underline">Download Resume</a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
=======
        setUser(userData ? JSON.parse(userData) : null);
        const apps = JSON.parse(localStorage.getItem('applications') || '[]');
        setApplications(apps);
    }, []);

    // For recruiters: show applications for their jobs
    if (user && user.userType === 'recruiter') {
        const myJobIds = notifications.filter(j => j.postedBy === user.email).map(j => j.id);
        const myApplications = applications.filter(app => myJobIds.includes(app.jobId));
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold mb-6">Applications for Your Jobs</h1>
                {myApplications.length === 0 ? (
                    <div className="text-gray-700">No students have applied yet.</div>
                ) : (
                    <div className="w-full max-w-2xl space-y-4">
                        {myApplications.map((app, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-semibold text-lg text-blue-700">{app.name}</div>
                                    <div className="text-gray-700">{app.email}</div>
                                    <div className="text-gray-700">Contact: {app.contact}</div>
                                    <div className="text-gray-700">Applied for: {app.jobTitle}</div>
                                    {app.resumeData && (
                                        <a href={app.resumeData} download={app.resumeName} className="text-blue-600 hover:underline">Download Resume</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
            </div>
        );
    }

    // For students: show job notifications with Apply button
    const handleApply = async (job: any) => {
        if (!applyForm.name || !applyForm.contact || !applyForm.email || !applyForm.resume) return;
        // Convert resume to base64
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
        const resumeData = await toBase64(applyForm.resume);
        const newApp = {
            ...applyForm,
            resumeData,
            resumeName: applyForm.resume.name,
            jobId: job.id,
            jobTitle: job.position,
            recruiter: job.postedBy,
        };
        const apps = JSON.parse(localStorage.getItem('applications') || '[]');
        apps.push(newApp);
        localStorage.setItem('applications', JSON.stringify(apps));
        setSuccess(true);
        setShowApply(null);
        setApplyForm({ name: '', contact: '', email: '', resume: null });
    };

<<<<<<< HEAD
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'job_update':
                return '💼';
            case 'hiring_schedule':
                return '📅';
            case 'general':
                return '📢';
            default:
                return '📋';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            
            {loading && (
                <div className="text-gray-600 mb-4">Loading notifications...</div>
            )}

            {/* Backend Notifications (Recruiter Updates) */}
            {backendNotifications.length > 0 && (
                <div className="w-full max-w-4xl mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Recruiter Updates</h2>
                    <div className="space-y-4">
                        {backendNotifications.map((notification, idx) => {
                            const isRead = notification.readBy && notification.readBy.includes(user.id);
                            return (
                            <div 
                                key={notification._id || idx} 
                                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 cursor-pointer transition-all duration-200 ${
                                    isRead 
                                        ? 'border-gray-300 opacity-75' 
                                        : notification.isUrgent 
                                            ? 'border-red-500' 
                                            : 'border-blue-500'
                                } ${!isRead ? 'hover:shadow-xl' : ''}`}
                                onClick={() => !isRead && markAsRead(notification._id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className={`font-semibold text-lg ${isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                                                    {notification.title}
                                                </h3>
                                                {notification.isUrgent && !isRead && (
                                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                                        URGENT
                                                    </span>
                                                )}
                                                {isRead && (
                                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                                                        READ
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 mb-3">{notification.message}</p>
                                            
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div><strong>From:</strong> {notification.recruiterName} ({notification.companyName})</div>
                                                {notification.jobTitle && (
                                                    <div><strong>Job:</strong> {notification.jobTitle}</div>
                                                )}
                                                {notification.hiringDate && (
                                                    <div><strong>Hiring Date:</strong> {formatDate(notification.hiringDate)}</div>
                                                )}
                                                {notification.location && (
                                                    <div><strong>Location:</strong> {notification.location}</div>
                                                )}
                                                <div><strong>Sent:</strong> {formatDate(notification.createdAt)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Job Notifications */}
            {notifications.length > 0 && (
                <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Job Opportunities</h2>
                    <div className="space-y-4">
                        {notifications.map((job, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-semibold text-lg text-blue-700">{job.position}</div>
                                    <div className="text-gray-700">{job.company}</div>
                                    <div className="text-sm text-gray-500">{job.type} | Deadline: {job.deadline}</div>
                                </div>
                                {user && user.userType === 'student' && (
                                    <div className="mt-4 md:mt-0">
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                            onClick={() => setShowApply(job.id)}
                                        >
                                            Apply
                                        </button>
                                        {showApply === job.id && (
                                            <form
                                                className="mt-4 bg-gray-50 p-4 rounded shadow flex flex-col gap-2"
                                                onSubmit={e => { e.preventDefault(); handleApply(job); }}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    className="border p-2 rounded"
                                                    value={applyForm.name}
                                                    onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Contact Number"
                                                    className="border p-2 rounded"
                                                    value={applyForm.contact}
                                                    onChange={e => setApplyForm({ ...applyForm, contact: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="border p-2 rounded"
                                                    value={applyForm.email}
                                                    onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    className="border p-2 rounded"
                                                    onChange={e => setApplyForm({ ...applyForm, resume: e.target.files ? e.target.files[0] : null })}
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-2"
                                                >
                                                    Submit Application
                                                </button>
                                            </form>
                                        )}
                                        {success && <div className="mt-2 text-green-600 font-medium">Application submitted!</div>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {backendNotifications.length === 0 && notifications.length === 0 && !loading && (
                <div className="text-gray-700 text-center">
                    <div className="text-4xl mb-4">📭</div>
                    <div>No notifications available.</div>
                    <div className="text-sm text-gray-500 mt-2">Check back later for updates from recruiters and new job opportunities.</div>
=======
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            {notifications.length === 0 ? (
                <div className="text-gray-700">No new job or internship notifications.</div>
            ) : (
                <div className="w-full max-w-2xl space-y-4">
                    {notifications.map((job, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="font-semibold text-lg text-blue-700">{job.position}</div>
                                <div className="text-gray-700">{job.company}</div>
                                <div className="text-sm text-gray-500">{job.type} | Deadline: {job.deadline}</div>
                            </div>
                            {user && user.userType === 'student' && (
                                <div className="mt-4 md:mt-0">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        onClick={() => setShowApply(job.id)}
                                    >
                                        Apply
                                    </button>
                                    {showApply === job.id && (
                                        <form
                                            className="mt-4 bg-gray-50 p-4 rounded shadow flex flex-col gap-2"
                                            onSubmit={e => { e.preventDefault(); handleApply(job); }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="border p-2 rounded"
                                                value={applyForm.name}
                                                onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Contact Number"
                                                className="border p-2 rounded"
                                                value={applyForm.contact}
                                                onChange={e => setApplyForm({ ...applyForm, contact: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-2 rounded"
                                                value={applyForm.email}
                                                onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="border p-2 rounded"
                                                onChange={e => setApplyForm({ ...applyForm, resume: e.target.files ? e.target.files[0] : null })}
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-2"
                                            >
                                                Submit Application
                                            </button>
                                        </form>
                                    )}
                                    {success && <div className="mt-2 text-green-600 font-medium">Application submitted!</div>}
                                </div>
                            )}
                        </div>
                    ))}
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
                </div>
            )}
        </div>
    );
};

export default NotificationsPage; 