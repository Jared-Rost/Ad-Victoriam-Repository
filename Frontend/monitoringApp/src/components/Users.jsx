import React, { useEffect, useState } from 'react';
import Map from './Map';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            if (data.users) {
                setUsers([...data.users]);
            }
        };

        socket.onerror = error => {
            console.error('WebSocket error:', error);
        };

        return () => socket.close();
    }, []);

    return (
        <>
            <Map users={users} />
            {users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id}>
                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Location:</strong> Latitude {user.location.latitude}, Longitude {user.location.longitude}</p>
                        <p><strong>Duration:</strong> {user.duration} minutes</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>IP:</strong> {user.IP}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No user data received.</p>
            )}
        </>
    );
}

export default Users;
