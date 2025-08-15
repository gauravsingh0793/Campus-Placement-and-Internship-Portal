import React, { useEffect, useState } from 'react';

const UserDebug: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const checkData = () => {
            const user = localStorage.getItem('user');
            const tokenData = localStorage.getItem('token');
            setUserData(user ? JSON.parse(user) : null);
            setToken(tokenData);
        };

        checkData();
        
        // Check every 2 seconds for debugging
        const interval = setInterval(checkData, 2000);
        
        return () => clearInterval(interval);
    }, []);

    if (!userData) {
        return (
            <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50">
                <strong>Debug:</strong> No user data found
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded z-50 max-w-xs">
            <strong>Debug:</strong>
            <div>User: {userData.fullName || userData.email}</div>
            <div>Type: {userData.userType}</div>
            <div>Token: {token ? 'Present' : 'Missing'}</div>
        </div>
    );
};

export default UserDebug;
