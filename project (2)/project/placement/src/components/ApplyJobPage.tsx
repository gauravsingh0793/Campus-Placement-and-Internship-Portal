import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyJobPage: React.FC = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [form, setForm] = useState({
        name: '',
        contact: '',
        email: '',
        resume: null as File | null,
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
        // Get jobs from localStorage and static jobs
        const recruiterJobs = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
        const staticJobs = [];
        try {
            // Try to get static jobs from window if available (optional)
            if ((window as any).STATIC_JOBS) {
                staticJobs.push(...(window as any).STATIC_JOBS);
            }
        } catch { }
        const allJobs = [...recruiterJobs, ...staticJobs];
        const found = allJobs.find((j: any) => String(j.id) === String(jobId));
        setJob(found || null);
    }, [jobId]);

    if (!user || user.userType !== 'student') {
        return <div className="flex flex-col items-center justify-center min-h-screen"><h2 className="text-2xl">Only students can apply for jobs.</h2></div>;
    }
    if (!job) {
        return <div className="flex flex-col items-center justify-center min-h-screen"><h2 className="text-2xl">Job not found.</h2></div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.contact || !form.email || !form.resume) return;
        // Convert resume to base64
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
        const resumeData = await toBase64(form.resume);
        const newApp = {
            ...form,
            resumeData,
            resumeName: form.resume.name,
            jobId: job.id,
            jobTitle: job.position,
            recruiter: job.postedBy,
        };
        const apps = JSON.parse(localStorage.getItem('applications') || '[]');
        apps.push(newApp);
        localStorage.setItem('applications', JSON.stringify(apps));
        setSuccess(true);
        setForm({ name: '', contact: '', email: '', resume: null });
        setTimeout(() => navigate('/jobs'), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Apply for {job.position}</h1>
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <div className="mb-4">
                    <div className="font-semibold text-lg text-blue-700">{job.company}</div>
                    <div className="text-gray-700">{job.type} | Deadline: {job.deadline}</div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-2 rounded"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        className="border p-2 rounded"
                        value={form.contact}
                        onChange={e => setForm({ ...form, contact: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="border p-2 rounded"
                        onChange={e => setForm({ ...form, resume: e.target.files ? e.target.files[0] : null })}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-2"
                    >
                        Submit Application
                    </button>
                </form>
                {success && <div className="mt-4 text-green-600 font-medium">Application submitted! Redirecting...</div>}
            </div>
        </div>
    );
};

export default ApplyJobPage; 