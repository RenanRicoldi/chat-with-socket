import express, { Request, Response } from 'express'
import { createServer } from 'http'
import io from 'socket.io'

const app = express()
const server = createServer(app)
const socketIo = io(server)

app.get('/', (request: Request, response: Response) => {
    response.sendFile(__dirname + '/site/index.html')
})

socketIo.on('connection', socket => {
    console.log('A user has connected')

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })

    socket.on('mensagem', (mensagem: string) => {
        const date = new Date()
        const time = `[${date.getHours() < 10 ? '0'+date.getHours(): date.getHours() }:${date.getMinutes()}] `
        console.log(time + mensagem)
    })
})

server.listen(8000, () => {
    console.log('listening on port 8000')
})