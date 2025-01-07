const express = require('express')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const users = {}

wss.on('connection', function connection(ws) {
	const broadcast = (users) => {
		wss.clients.forEach(client => {
			if (client !== wss && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ users }))
			}
		})
	}

	ws.on('message', function incoming(message) {
		const { user } = JSON.parse(message)
		users[user.user_id] = {
			id: user.user_id,
			name: user.username,
			page: user.page,
			duration: user.duration,
			IP: user.IP,
			location: {
				lat: user.location.lat,
				lng: user.location.lng
			}
		}
		console.log('received: %s', Object.keys(users).length)
		console.log(user);
		broadcast(Object.values(users))
	})

	ws.on('close', function close() {
	})
})

const PORT = process.env.PORT || 4000
server.listen(PORT, function () {
	console.log(`Server is listening on port ${PORT}`)
})
