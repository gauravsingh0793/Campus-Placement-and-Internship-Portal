const fetch = require('node-fetch');

async function testBackend() {
    console.log('Testing backend API...');
    
    try {
        // Test 1: Check if server is running
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@test.com',
                password: 'test123',
                userType: 'recruiter'
            })
        });
        
        console.log('Server response status:', response.status);
        
        if (response.status === 401) {
            console.log('✅ Backend is running (expected 401 for invalid credentials)');
        } else {
            console.log('❌ Unexpected response:', response.status);
        }
        
    } catch (error) {
        console.log('❌ Backend connection failed:', error.message);
        console.log('Make sure the backend server is running on port 5000');
    }
}

testBackend();


