import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const port = 3000

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)
    socket.emit('setup', game.state)

    socket.on('place-select', (command) => {
        console.log('teste Repetição')
        command.playerId = playerId
        game.placeSelect(command)
    })
})

server.listen(port, () => {
    console.log(`> Server listening on port: ${port}`)
})