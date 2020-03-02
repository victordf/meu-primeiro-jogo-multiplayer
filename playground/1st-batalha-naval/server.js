import express from 'express'
import http from 'http'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const port = 3000

app.use(express.static('public'))

server.listen(port, () => {
    console.log(`> Server listening on port: ${port}`)
})