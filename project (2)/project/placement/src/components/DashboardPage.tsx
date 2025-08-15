import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
    }, []);

    if (!user) {
        return <div className="flex flex-col items-center justify-center min-h-screen"><h2 className="text-2xl">Please log in to view your dashboard.</h2></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome, {user.fullName || user.email}!</h1>
            <p className="text-lg text-gray-700 mb-2">Email: {user.email}</p>
            {user.college && <p className="text-lg text-gray-700 mb-2">College: {user.college}</p>}
<<<<<<< HEAD
            {user.course && <p className="text-lg text-gray-700 mb-2">Course: {user.course}</p>}
=======
            {user.course && <p className="text-lg text-red mb-2">Course: {user.course}</p>}
>>>>>>> 32e55c00e4be434fcc3e7e72365dedc5d43ba6bc
            {user.graduationYear && <p className="text-lg text-gray-700 mb-2">Graduation Year: {user.graduationYear}</p>}
            {user.companyName && <p className="text-lg text-gray-700 mb-2">Company: {user.companyName}</p>}
            {user.designation && <p className="text-lg text-gray-700 mb-2">Designation: {user.designation}</p>}
        </div>
    );
};

export default DashboardPage; 