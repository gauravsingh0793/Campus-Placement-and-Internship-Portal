import React, { useEffect, useState } from 'react';

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [showApply, setShowApply] = useState<number | null>(null);
    const [applyForm, setApplyForm] = useState({
        name: '',
        contact: '',
        email: '',
        resume: null as File | null,
    });
    const [success, setSuccess] = useState(false);
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
        setNotifications(jobs);
        const userData = localStorage.getItem('user');
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
                </div>
            )}
        </div>
    );
};

export default NotificationsPage; 