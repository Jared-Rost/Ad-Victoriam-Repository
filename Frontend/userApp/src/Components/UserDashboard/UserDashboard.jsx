import React from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
    const page = 2;
    return (
        <div className='wrapper'>
            <h1>Welcome to User Dashboard</h1>
            <p>This is your dashboard where you can manage your account.</p>
            <ul>
                <li>View Profile</li>
                <li>Edit Profile</li>
                <li>Change Password</li>
                <li>Logout</li>
            </ul>
        </div>
    );
};

export default UserDashboard;