import React, { useState, useEffect } from 'react';

const MyNotificationsPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string>('');
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const tokenData = localStorage.getItem('token');
        if (userData && tokenData) {
            setUser(JSON.parse(userData));
            setToken(tokenData);
            
            if (JSON.parse(userData).userType === 'recruiter') {
                fetchMyNotifications();
            }
        } else {
            // Redirect to login if no token
            window.location.href = '/login';
        }
    }, [token]);

    const fetchMyNotifications = async () => {
        if (!token) return;
        
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/notifications/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications || []);
            } else if (response.status === 401) {
                // Token expired or invalid, redirect to login
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch notifications');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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

    const getNotificationTypeLabel = (type: string) => {
        switch (type) {
            case 'job_update':
                return 'Job Update';
            case 'hiring_schedule':
                return 'Hiring Schedule';
            case 'general':
                return 'General Announcement';
            default:
                return 'Notification';
        }
    };

    if (!user || user.userType !== 'recruiter') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-red-600 text-xl">Access denied. Only recruiters can view their notifications.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">My Sent Notifications</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center text-gray-600 mb-4">Loading your notifications...</div>
                )}

                {notifications.length === 0 && !loading ? (
                    <div className="text-center text-gray-700">
                        <div className="text-4xl mb-4">📭</div>
                        <div>You haven't sent any notifications yet.</div>
                        <div className="text-sm text-gray-500 mt-2">
                            <a href="/send-notification" className="text-blue-600 hover:underline">
                                Send your first notification
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification, idx) => (
                            <div 
                                key={notification._id || idx} 
                                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
                                    notification.isUrgent ? 'border-red-500' : 'border-blue-500'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {notification.title}
                                                </h3>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                                    {getNotificationTypeLabel(notification.type)}
                                                </span>
                                                {notification.isUrgent && (
                                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                                        URGENT
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 mb-3">{notification.message}</p>
                                            
                                            <div className="text-sm text-gray-600 space-y-1">
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
                                                <div><strong>Read by:</strong> {notification.readBy?.length || 0} students</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <a 
                        href="/send-notification"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                    >
                        Send New Notification
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MyNotificationsPage;
