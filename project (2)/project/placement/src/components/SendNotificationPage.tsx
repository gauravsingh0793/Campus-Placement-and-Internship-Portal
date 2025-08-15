import React, { useState, useEffect } from 'react';

const SendNotificationPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'general',
        jobId: '',
        jobTitle: '',
        hiringDate: '',
        location: '',
        isUrgent: false
    });
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const tokenData = localStorage.getItem('token');
        if (userData && tokenData) {
            setUser(JSON.parse(userData));
            setToken(tokenData);
            
            // Load existing jobs for job-specific notifications
            const existingJobs = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
            setJobs(existingJobs.filter((job: any) => job.postedBy === JSON.parse(userData).email));
        } else {
            // Redirect to login if no token
            window.location.href = '/login';
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    title: '',
                    message: '',
                    type: 'general',
                    jobId: '',
                    jobTitle: '',
                    hiringDate: '',
                    location: '',
                    isUrgent: false
                });
            } else if (response.status === 401) {
                // Token expired or invalid, redirect to login
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to send notification');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleJobSelect = (jobId: string) => {
        const selectedJob = jobs.find(job => job.id === jobId);
        setFormData(prev => ({
            ...prev,
            jobId: jobId,
            jobTitle: selectedJob ? selectedJob.position : ''
        }));
    };

    if (!user || user.userType !== 'recruiter') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-red-600 text-xl">Access denied. Only recruiters can send notifications.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Send Notification to Students</h1>
                
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        Notification sent successfully!
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notification Type *
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="general">General Announcement</option>
                            <option value="job_update">Job Profile Update</option>
                            <option value="hiring_schedule">Hiring Schedule</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter notification title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            placeholder="Enter detailed message"
                            required
                        />
                    </div>

                    {formData.type === 'job_update' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Job (Optional)
                            </label>
                            <select
                                value={formData.jobId}
                                onChange={(e) => handleJobSelect(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a job</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.position} - {job.company}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.type === 'hiring_schedule' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hiring Date *
                                </label>
                                <input
                                    type="datetime-local"
                                    value={formData.hiringDate}
                                    onChange={(e) => setFormData({ ...formData, hiringDate: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter hiring location"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isUrgent"
                            checked={formData.isUrgent}
                            onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-700">
                            Mark as urgent notification
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Send Notification'}
                    </button>
                </form>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Notification Types:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li><strong>General Announcement:</strong> General updates and announcements</li>
                        <li><strong>Job Profile Update:</strong> Updates about job requirements, deadlines, or changes</li>
                        <li><strong>Hiring Schedule:</strong> Information about interview dates, hiring events, or recruitment drives</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SendNotificationPage;
