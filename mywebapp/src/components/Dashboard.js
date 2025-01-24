import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        } else {

            fetchUserData(token);
        }
    }, [navigate]);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user);
        } catch (err) {
            console.error('Error fetching user data', err);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
