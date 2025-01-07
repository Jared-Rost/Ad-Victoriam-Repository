import React, { useEffect, useState } from 'react'

const Socket = ({ userInfo }) => {
    const sessionStart = Date.now();
    const [ws, setWs] = useState(null);
    const [center, setCenter] = useState({ lat: 49.8106368, lng: -97.140736 })

    useEffect(() => {
        getLocation()
        const socket = new WebSocket('ws://localhost:4000');
        setWs(socket);

        socket.onmessage = (message) => {
            console.log('Received:', message.data);
        };

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };
    }, []);

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                },
                (error) => {
                    console.error("Error Code = " + error.code + " - " + error.message)
                }
            )
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    const sendUsers = () => {
        const user = {
            ...userInfo,
            "location": {
                "lat": center.lat,
                "lng": center.lng
            },
            "duration": Date.now() - sessionStart,
            "IP": "192.168.1.2",
        }
        if (ws) {
            console.log(user);
            ws.send(JSON.stringify({ user }));
        }
    };

    return (
        <div>
            <button onClick={sendUsers}>Send user info</button>
        </div>
    );
}

export default Socket
