import { useEffect, useState } from 'react';

function App() {
  const sessionStart = Date.now();
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');
    setWs(socket);

    socket.onmessage = (message) => {
      console.log('Received:', message.data);
    };

    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
  }, []);

  const sendUsers = () => {
    const user = {
      "id": 4,
      "firstName": "Jane",
      "lastName": "Smith",
      "location": {
        "lat": -3.743,
        "lng": -38.523
      },
      "duration": Date.now() - sessionStart,
      "status": "inactive",
      "IP": "192.168.1.2",
      "page": 1
    }
    if (ws) {
      ws.send(JSON.stringify({ user }));
    }
  };

  return (
    <div className="App">
      <button onClick={sendUsers}>Send user info</button>
    </div>
  );
}

export default App;
